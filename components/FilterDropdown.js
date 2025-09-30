import React, { useState } from "react";

function FilterDropdown({ groups, filterList, addToFilterList, removefromFilterList, filterFeed, removeFilters }) {

  const [isOpen, setIsOpen] = useState(false);
  const allLinks = filterList.flatMap(group => group.id);
  const [selectedGroups, setSelectedGroups] = useState(allLinks);

  const toggleGroup = (group) => {
    if (selectedGroups.includes(group.id)) {
      setSelectedGroups((prev) => prev.filter((g) => g !== group.id));
      removefromFilterList(group);
    } else {
      setSelectedGroups((prev) => [...prev, group.id]);
      addToFilterList(group);
    }
  };

    const handleSave = () => {
        if (selectedGroups.length === 0) {
            removeFilters();
            setSelectedGroups([]);
        }
        else{
            filterFeed();
        }
        
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
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        {isOpen ? "Save" : "Select Group"}
      </button>

      {/* Dropdown with animation */}
      <div
        className={`absolute bottom-full mb-2 w-48 bg-white rounded shadow-lg overflow-hidden z-10
          transform origin-bottom transition-all duration-200
          ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
      >
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => toggleGroup(group)}
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 transition
              ${selectedGroups.includes(group.id) ? "bg-blue-600 text-white" : "text-gray-800"}`}
          >
            {group.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterDropdown;


