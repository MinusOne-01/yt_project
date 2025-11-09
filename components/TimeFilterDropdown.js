import React, { useState, useEffect } from "react";

function TimeFilterDropdown({ extendFeed }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const options = [
    { label: "Last 24 Hours", value: 1 },
    { label: "Last 48 Hours", value: 2 },
    { label: "Last Week", value: 7 },
    { label: "Last Month", value: 30 },
  ];

  const handleSave = () => {
    if (selected !== null) {
      extendFeed(selected);
    }
    setIsOpen(false);
  };

  useEffect(() => {
          setSelected(2);
          handleSave();
    }, []);

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        onClick={() => {
          if (isOpen) {
            handleSave();
          } else {
            setIsOpen(true);
          }
        }}
        className="px-11 py-3 rounded font-semibold text-white 
                      bg-gray-600 
                      hover:bg-gray-700
                      shadow-lg hover:shadow-xl 
                      transition-all duration-200 
                      hover:scale-[1.02] active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <span className="invisible block">Select Time</span>
        <span className="absolute inset-0 flex items-center justify-center">
          {isOpen ? "Save" : "Select Time"}
        </span>
      </button>

      {/* Dropdown */}
  <div
    className={`absolute bottom-full mb-3 w-52 
               bg-gray-800 backdrop-blur-md 
               rounded shadow-lg overflow-hidden 
               border border-gray-700/40 z-10
               transform origin-bottom transition-all duration-200
               ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
  >
    {options.map((opt) => (
      <div
        key={opt.value}
        onClick={() => setSelected(opt.value)}
        className={`px-4 py-2.5 cursor-pointer text-sm transition-all
          ${
            selected === opt.value
              ? "bg-blue-600/70 text-white"
              : "text-gray-200 hover:bg-gray-700/70 hover:text-white"
          }`}
      >
        {opt.label}
      </div>
    ))}
  </div>


    </div>
  );
}

export default TimeFilterDropdown;
