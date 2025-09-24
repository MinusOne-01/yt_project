import React from 'react'

const GroupSelectForm = ({ groups, filterList, addToFilterList, removefromFilterList, setGroupSelectorView }) => {
  return (
    <div>
        <div className="container mx-auto px-4 py-20">

        <h5 className="text-4xl md:text-3xl lg:text-5xl font-bold text-white mb-6 text-center">
            What do you want to watch?
        </h5>
              <div className="container mx-auto px-4 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                      {groups.map((group, index) => {

                        const isSelected = filterList.includes(group.id);
                        return(
                          <div
                              key={index}
                              className={`group relative bg-gradient-to-br from-white/20 to-white/5 
                 backdrop-blur-xl rounded-2xl p-6 shadow-lg 
                 flex flex-col items-center 
                 transition-transform transform hover:scale-105 
                 hover:shadow-xl
                  ${isSelected ? 'bg-gray-600 text-white shadow-2xl' : 'bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl text-white'}
                  `}
                          onClick={() => isSelected ? removefromFilterList(group.links) : addToFilterList(group.links)}
                          >

                              <h2 className="text-lg font-semibold text-white mb-1">
                                  {group.name}
                              </h2>
                          </div>
                        );

                     })}
                  </div>
              </div>

            <div>
                  <button
                      className='px-8 py-3 mb-5 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-red-400 to-pink-500 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-pink-400'
                      onClick={() => setGroupSelectorView(false)}
                  >Go to Feed</button>
            </div>  

        </div>
    </div>
  )
}

export default GroupSelectForm