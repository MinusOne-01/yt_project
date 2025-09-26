import React from "react";

const FeedView = ({ videos, filterFeed, VideoPlayer}) => {
console.log("feedView->", videos);
    return (
    <div className="grid grid-cols-5 gap-6 p-6">
      {videos.map((video) => (
        <div key={video.id}>
          <VideoPlayer id={video.id} title={video.title} thumbnail={video.thumbnail}/>
          <p className="mt-2 font-medium">{video.title}</p>
        </div>
      ))}
      <button
                      className='px-8 py-3 mb-5 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-red-400 to-pink-500 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-pink-400'
                      onClick={() => filterFeed()}
                  >Go to Feed</button>
    </div>
  );
}

export default FeedView;