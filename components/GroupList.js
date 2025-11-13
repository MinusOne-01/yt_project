import React from 'react'

const GroupList = ({ groups, delGroup, setGroupChannelView, setGroupFolderId }) => {

  return (
    <div className="container mx-auto px-15 py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  {groups.map((group, index) => (
                      <div
                          key={index}
                          className="group relative bg-gradient-to-br from-white/20 to-white/5 
                 backdrop-blur-xl rounded-2xl p-6 shadow-lg 
                 flex flex-col items-center 
                 transition-transform transform hover:scale-105 
                 hover:shadow-xl"
                          onClick={() => {
                            setGroupFolderId(group.id)
                            setGroupChannelView("on")
                          }}
                      >
                        <button
                          className="absolute top-1 right-3 text-white/70 
                 opacity-0 group-hover:opacity-100 
                 transition-opacity duration-200 hover:text-red-500"
                 onClick={(e) => {
                  e.stopPropagation();
                  delGroup(group.id)
                }}
                        >
                          &times;
                        </button>

                          <h2 className="text-lg font-semibold text-white mb-1">
                              {group.name}
                          </h2>
                     </div>
                  ))}
              </div>
              </div>
  )
}

export default GroupList