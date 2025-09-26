import React, { useState } from "react";

function GroupCard({ group, addToFilterList, removefromFilterList }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`group relative bg-gradient-to-br from-white/20 to-white/5 
      backdrop-blur-xl rounded-2xl p-6 shadow-lg 
      flex flex-col items-center 
      transition-transform transform hover:scale-105 
      hover:shadow-xl
      ${isSelected ? 'bg-gray-600 text-white shadow-2xl' :
      'bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl text-white'}
      `}
      onClick={() => {
        setIsSelected(prev => {
          const newSelected = !prev;
          newSelected
            ? addToFilterList(group.links)
            : removefromFilterList(group.links);
          return newSelected;
        });
      }}
    >
      <h2 className="text-lg font-semibold text-white mb-1">
        {group.name}
      </h2>
    </div>
  );
}

export default GroupCard