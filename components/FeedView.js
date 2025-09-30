import React from "react";

const FeedView = ({ videos, VideoPlayer}) => {
console.log("feedView->", videos);
  return (
    <div>
      <div className="grid grid-cols-5 gap-6 p-6">
        {videos.map((video) => (
          <div key={video.id}>
            <VideoPlayer id={video.id} title={video.title} thumbnail={video.thumbnail} />
            <p className="mt-2 font-medium">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedView;