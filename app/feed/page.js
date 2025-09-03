'use client';
import React, { useEffect, useState } from 'react';

// Component to render video player
function VideoEmbed({ id, title, thumbnail }) {
  const [play, setPlay] = useState(false);

  return (
    <div
      className="relative aspect-video cursor-pointer"
      onClick={() => setPlay(true)}
    >
      {play ? (
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </>
      )}
    </div>
  );
}

// Main Feed Page
export default function FeedPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/youtube');
        if (!res.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await res.json();

        // Updated: backend now returns { videos: [...] }
        setVideos(data.videos || []);
        console.log("Fetched videos:", data.videos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-5 gap-6 p-6">
      {videos.map((video) => (
        <div key={video.id}>
          <VideoEmbed
            id={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
          />
          <p className="mt-2 font-medium">{video.title}</p>
        </div>
      ))}
    </div>
  );
}
