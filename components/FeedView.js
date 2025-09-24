import React from "react";

const FeedView = ({ videos, filterList, VideoPlayer }) => {
//console.log(videos);
console.log(filterList);
    return (
    <div className="grid grid-cols-5 gap-6 p-6">
      {videos.videos.map((video) => (
        <div key={video.id}>
          <VideoPlayer id={video.id} title={video.title} thumbnail={video.thumbnail}/>
          <p className="mt-2 font-medium">{video.title}</p>
        </div>
      ))}
    </div>
  );
}

export default FeedView;