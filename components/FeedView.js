import React from "react";
import VideoCard from '@/components/VideoCard';
import useTranscript from "@/hooks/useTranscript";
import Masonry from "react-masonry-css";

const FeedView = ({ videos }) => {
  
  const { transcripts, setTranscripts, loading } = useTranscript(videos);

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        No videos available <p>Try changing selected group or time</p>
      </div>
    );
  }

  const breakpointColumns = {
    default: 2,
    1024: 1,
    768: 1,
  };

  return (
    <div className="px-8 py-6 pb-70 flex justify-center overflow-y-auto scrollbar-hide">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-10"
        columnClassName="flex flex-col gap-6"
      >
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            author={video.author}
            transcript={transcripts[video.id]?.transcript}
            desc={transcripts[video.id]?.summary}
            txtloading={loading}

            onSummaryGenerated={(generatedDesc) => {
              setTranscripts((prev) => {
                const newMap = { ...prev };
                newMap[video.id].summary = generatedDesc;
                newMap[video.id].fetchedAt = new Date().toISOString();
                return newMap;
              });
            }}
          />

        ))}
      </Masonry>
    </div>
  );
};

export default FeedView;
