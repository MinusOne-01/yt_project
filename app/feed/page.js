'use client';
import React, { useState, useEffect } from 'react';

import useFeed from '@/hooks/useFeed';
import FeedView from '@/components/FeedView';
import VideoPlayer from '@/components/VideoPlayer';

export default function Feed() {
  const { videos, loading, error, buildFeed } = useFeed();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => setShowContent(true), 50); // small delay
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FF8235] to-[#30E8BF]">
        <p className="text-white font-medium text-lg">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF8235] to-[#30E8BF] pb-40">
      {loading ? (
        <div >
          {/* skeleton cards */}
          <div className="grid grid-cols-5 gap-6 p-6">
            {[...Array(10)].map((_, i) => (
              <div key={i}>
                {/* skeleton title n thumbnail placeholder */}
                <div className="relative aspect-video bg-white/20 rounded-xl animate-pulse"></div>
                <div className="mt-2 h-4 bg-white/30 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`transition-opacity duration-700 ease-in-out ${showContent ? "opacity-100" : "opacity-0"
          }`}>
        <FeedView videos={videos} VideoPlayer={VideoPlayer} />
        </div>
      )}
    </div>
  );
}

