import React, { useState } from 'react'

const GroupSelectForm = ({ groups, updateFilterList, setGroupSelectorView, groupsloading }) => {

  const [selectedGroups, setSelectedGroups] = useState([]);
  const noGroups = groups.length === 0;
  
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
  };

  return (
    <div>
        <div className="container mx-auto px-4 py-10 md:py-20">

          <h5 className="text-3xl lg:text-5xl font-bold text-white mb-6 text-center">
              What do you want to watch?
          </h5>
                <div className={`container mx-auto px-15 py-5 transition-all duration-500 ${groupsloading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    { noGroups && <div className="text-base md:text-xl text-gray-500 leading-relaxed text-center">
                        Your groups will appear here to select           
                    </div> }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                        {groups.map((group) => (
                          <div
                            key={group.id}
                            onClick={() => toggleSelection(group)}
                            className={`group relative bg-gradient-to-br from-white/20 to-white/5 
                                      backdrop-blur-xl rounded-2xl p-6 shadow-lg 
                                      flex flex-col items-center 
                                      transition-transform transform hover:scale-105 
                                      hover:shadow-xl
                                      ${selectedGroups.some((g) => g.id === group.id) ? 'bg-gray-600 text-white shadow-2xl' : 'bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl text-white'}`}
                          >
                            <h2 className="text-lg font-semibold text-white mb-1">
                              {group.name}
                            </h2>
                          </div>
                      ))}
                    </div>                                      
                </div>  
        </div>

        <div className={`fixed bottom-0 w-full p-8 md:p-10 
                    bg-gray-900/95 backdrop-blur-sm
                    border-t border-white/10
                    shadow-[0_-4px_24px_0_rgba(0,0,0,0.5)]
        `}>
        
        <div className='flex flex-row items-center justify-center gap-4'>

        <button
        className='px-8 py-3 rounded-xl font-semibold text-white 
                      bg-gray-600 
                      hover:bg-gray-700
                      shadow-lg hover:shadow-xl 
                      transition-all duration-200 
                      hover:scale-[1.02] active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-white/50'
        onClick={() => {
                setGroupSelectorView(false);    
        }}
        >Go with Everything</button>
        <button
        className='px-8 py-3 rounded-xl font-semibold text-white 
                  bg-gray-600 
                  hover:bg-gray-700
                  shadow-lg hover:shadow-xl 
                  transition-all duration-200 
                  hover:scale-[1.02] active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-white/50'
        onClick={() => {
                if(selectedGroups.length == 0){
                  alert("Select a group to continue");
                }else{
                handleSave();  
                setGroupSelectorView(false); 
                }
        }}
        >Selected Groups</button>
        </div>  
        </div>
    </div>
  )
}

export default GroupSelectForm