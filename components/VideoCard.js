import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import getSummary from "@/hooks/getSummary";


export default function VideoCard({ id, title, author, transcript, desc, txtloading, onSummaryGenerated }) {
  const [expanded, setExpanded] = useState(false);
  const [play, setPlay] = useState(false);
  const [summary, setSummary] = useState(desc);
  const [loadingSummary, setLoadingSummary] = useState(false);
  
  function getStatusText() {
    if (txtloading) return "Getting the connections ready...";
    if (!transcript) return "Summary cannot be generated for this video";
    return "Reopen card to generate Summary";
  }

  const handleSummarize = async () => {
 
    if(!transcript || txtloading) return;
    if(desc != null){
      setSummary(desc);
      return;
    }
    try{
      setLoadingSummary(true);
      const summaryText = await getSummary(transcript);
      setSummary(summaryText);
      onSummaryGenerated(summaryText);
    }
    catch(err){
      console.error("Summary fetch failed:", err);
    }
    finally{
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    if(expanded){
      handleSummarize();
    }
  }, [expanded]);


  return (
    <div
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 cursor-pointer 
                 transition-all duration-300 hover:shadow-xl"
      onClick={() => setExpanded((prev) => !prev)}
    >
      {/* Title & author */}
      <div className="text-center">
        <p className="text-xl sm:text-2xl font-serif italic text-gray-800 mb-2">
          “{title}”
        </p>
        <p className="text-sm text-gray-500">{author}</p>
      </div>

      {/* Expandable section */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent re-collapse
          >
            <div className="text-gray-600 text-sm mb-4 leading-relaxed">
              {(loadingSummary) ? (
                // shimmer loading effect
                <div className="animate-pulse space-y-2">
                  <div className="h-3 bg-gray-300 rounded w-11/12"></div>
                  <div className="h-3 bg-gray-300 rounded w-10/12"></div>
                  <div className="h-3 bg-gray-300 rounded w-8/12"></div>
                </div>
              ) : summary ? (
                <p>{summary}</p>
              ) : (
                <p className="text-gray-400 italic">{getStatusText()}</p>
              )}
            </div>

            {/* Play button */}
            {!play ? (
              <button
                className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
                onClick={() => setPlay(true)}
              >
                ▶ Play Video
              </button>
            ) : (
              <div className="mt-3 aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0&showinfo=0&disablekb=1&iv_load_policy=3`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
