import { useState, useEffect } from "react";

const CONCURRENCY_LIMIT = 5;

export default function useTranscript(videos) {

  const [transcripts, setTranscripts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videos || videos.length === 0) {
      setLoading(false);
      return;
    }

    const extractVideoId = (url) => {
      try {
        const u = new URL(url);
        return u.searchParams.get("v");
      } catch {
        return null;
      }
    };

    const fetchWithLimit = async (tasks, limit) => {
      const results = [];
      const executing = new Set();

      for (const task of tasks) {
        const p = task().then((result) => {
          executing.delete(p);
          return result;
        });
        results.push(p);
        executing.add(p);

        if (executing.size >= limit) {
          await Promise.race(executing);
        }
      }

      return Promise.all(results);
    };

    const fetchTranscripts = async () => {
      setLoading(true);
      try {
        // Filter out videos that already have transcripts
        const videosToFetch = videos.filter(
          (v) => !(v.id in transcripts)
        );

        if (videosToFetch.length === 0) {
          setLoading(false);
          return;
        }

        const tasks = videosToFetch.map((v) => async () => {
          const videoId = extractVideoId(v.link);
          console.log("Link->", v.link);
          console.log("Id->", videoId);
          try {
            const res = await fetch("/api/transcript", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ videoId }),
            });
            const data = await res.json();
            console.log("Recieved->", data);
            return { videoId, transcript: data.transcript || null };
          } catch (err) {
            console.warn(`Transcript failed for ${v.title}`, err);
            return { videoId, transcript: null };
          }
        });

        const results = await fetchWithLimit(tasks, CONCURRENCY_LIMIT);

        // Merge new transcripts into existing map
        setTranscripts((prev) => {
          const newMap = { ...prev };
          results.forEach(({ videoId, transcript }) => {
            if (videoId && transcript) newMap[videoId] = transcript;
          });
          return newMap;
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTranscripts();
  }, [videos]); // rerun when videos array changes

  return { transcripts, loading };
}
