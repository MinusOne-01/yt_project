import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import getSummary from "@/hooks/getSummary";
import { Noto_Sans } from "next/font/google";

const headline_font = Noto_Sans({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);


  return (
    <div
      className="w-full max-w-md min-w-0 bg-white rounded-2xl shadow-md cursor-pointer px-5 py-4 md:px-10 md:py-6"
      onClick={() =>{
        setExpanded((prev) => !prev);
        setPlay(false);
      }}
    >
      {/* Title & author */}
      <div className="text-center">
        <p className={`${headline_font.className} text-xm md:text-2xl text-gray-800 mb-2 px-5 md:px-10`}>
          &quot;{title}&quot;
        </p>
        <p className="text-xs text-gray-500">{author}</p>
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
            <div className="text-gray-600 text-xs md:text-[14px] leading-relaxed py-3">
              {(loadingSummary) ? (
                // shimmer loading effect
                <div className="animate-pulse space-y-2">
                  <div className="h-3 bg-gray-300 rounded w-11/12"></div>
                  <div className="h-3 bg-gray-300 rounded w-10/12"></div>
                  <div className="h-3 bg-gray-300 rounded w-8/12"></div>
                </div>
              ) : summary ? (
                <p className="whitespace-pre-line text-wrap-balance">{summary}</p>
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
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
