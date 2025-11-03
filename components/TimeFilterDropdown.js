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
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        {isOpen ? "Save" : "Select Time"}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 w-48 bg-white rounded shadow-lg overflow-hidden z-10">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={`px-4 py-2 cursor-pointer transition
                ${
                  selected === opt.value
                    ? "bg-blue-600 text-white"
                    : "text-gray-800 hover:bg-blue-100"
                }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TimeFilterDropdown;
