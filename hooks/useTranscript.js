import { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { purgeOldEntries } from "@/utils/purgeOldEntries";

const CONCURRENCY_LIMIT = 1; 
const LAST_CLEANUP_KEY = "transcriptCacheLastCleanup";

export default function useTranscript(videos) {

  const [transcripts, setTranscripts] = useLocalStorage("transcriptsCache" ,{});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // return if No videos
    if (!videos || videos.length === 0) {
      setLoading(false);
      return;
    }
    
    // function to extract videoID
    const extractVideoId = (url) => {
      try {
        const idRegex = /^[a-zA-Z0-9_-]{11}$/;
        const parsed = new URL(url);

        // Case 1: Standard YouTube link like /watch?v=ID
        const vParam = parsed.searchParams.get("v");
        if (vParam && idRegex.test(vParam)) {
          return vParam;
        }

        // Case 2: Shorts, embed, or /v/ style
        const segments = parsed.pathname.split("/").filter(Boolean);
        if (segments.length >= 2) {
          const [first, second] = segments;
          if (
            (first === "shorts" || first === "embed" || first === "v") &&
            idRegex.test(second)
          ) {
            return second;
          }
        }
        return null;
      } catch (err) {
        console.warn("extractVideoId error:", err);
        return null;
      }
    };

    
    // Controls how many transcripts are fetched in parallel
    const fetchWithLimit = async (tasks, limit) => {

      const results = [];
      const executing = new Set();

      for (const task of tasks){

        const p = task().then((result) => {
          executing.delete(p);
          return result;
        });
        results.push(p);
        executing.add(p);
        if(executing.size >= limit){
          await Promise.race(executing);
        }

      }
      return Promise.all(results);

    };
    

    // main function to fetch transcripts and build hash map
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
          try {
            const res = await fetch("/api/transcript", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ videoId }),
            });
            const data = await res.json();
            return { videoId, transcript: data.transcript || null };
          }
          catch (err){
            console.warn(`Transcript failed for ${v.title}`, err);
            return { videoId, transcript: null };
          }
        });

        const results = await fetchWithLimit(tasks, CONCURRENCY_LIMIT);

        // Merge new transcripts into existing map
        setTranscripts((prev) => {
          const newMap = { ...prev };
          results.forEach(({ videoId, transcript }) => {
            if (videoId) newMap[videoId] = { transcript, summary: null, fetchedAt: new Date().toISOString() };
          });
          return newMap;
        });
      }
      finally{
        setLoading(false);
      }
    };

    fetchTranscripts();
  }, [videos]); // rerun when videos array changes
  
  
  // cleanups cache on mount
  useEffect(() => {
    const lastCleanup = localStorage.getItem(LAST_CLEANUP_KEY);
    const now = Date.now();
    const last = lastCleanup ? new Date(lastCleanup).getTime() : 0;
    const diffDays = (now - last) / (1000 * 60 * 60 * 24);
    
    // cleanup only after every 30 days or so
    if (diffDays >= 30) {
      console.log("🧹 Auto cleaning old transcripts...");
      setTranscripts((prev) => purgeOldEntries(prev, 15));
      localStorage.setItem(LAST_CLEANUP_KEY, new Date().toISOString());
    }
  }, []);


  return { transcripts, setTranscripts, loading };
}
