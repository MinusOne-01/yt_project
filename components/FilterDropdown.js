import React, { useState } from "react";

function FilterDropdown({ groups, updateFilterList }) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const toggleSelection = (group) => {
    setSelectedGroups((prev) => {
      const alreadySelected = prev.some((g) => g.id === group.id);
      return alreadySelected
        ? prev.filter((g) => g.id !== group.id) // remove
        : [...prev, group];                    // add
    });
  };

    const handleSave = () => {
        updateFilterList(selectedGroups);
        setIsOpen(false);
    };

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
        <span className="invisible block">Select Group</span>
        <span className="absolute inset-0 flex items-center justify-center">
          {isOpen ? "Save" : "Select Group"}
        </span>
      </button>

      {/* Dropdown with animation */}
      <div
        className={`absolute bottom-full mb-3 w-52 
               bg-gray-800 backdrop-blur-md 
               rounded shadow-lg overflow-hidden 
               border border-gray-700/40 z-10
               transform origin-bottom transition-all duration-200
               ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
      >
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => toggleSelection(group)}
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 transition
              ${selectedGroups.some((g) => g.id === group.id) ? "bg-blue-600/70 text-white" : "text-gray-200 hover:bg-gray-700/70 hover:text-white"}`}
          >
            {group.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterDropdown;


