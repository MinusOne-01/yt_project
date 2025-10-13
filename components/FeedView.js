import React, { useEffect } from "react";
import useTranscript from "@/hooks/useTranscript";

const FeedView = ({ videos, VideoCard }) => {

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        No videos to display
      </div>
    );
  }
  else{
    const { transcripts, loading } = useTranscript(videos);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div
        className="grid gap-6 
                   grid-cols-1 
                   sm:grid-cols-2 
                   md:grid-cols-3 
                   lg:grid-cols-4 
                   xl:grid-cols-5"
      >
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            author={video.author}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedView;
