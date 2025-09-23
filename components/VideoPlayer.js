import React, { useState } from "react";

const VideoPlayer = ({ id, title, thumbnail }) => {
    const [play, setPlay] = useState(false);
  return (
    <div
      className="relative aspect-video cursor-pointer group overflow-hidden rounded-xl shadow-lg"
      onClick={() => setPlay(true)}
    >
      {play ? (
        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          {/* Thumbnail */}
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30 group-hover:bg-white/30 transition-colors">
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Title on bottom */}
          <div className="absolute bottom-2 left-3 right-3 text-white text-sm font-medium truncate">
            {title}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
