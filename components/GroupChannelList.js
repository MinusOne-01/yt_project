import React, { useEffect, useState } from 'react'

const GroupChannelList = ({ groups, groupFolderId, channels, setGroupChannelView, setGroupEditView, Image }) => {

  const currentGroup = groups.find(g => g.id === groupFolderId);
  if (!currentGroup) {
  return <div>Loading group...</div>;
  }

  const channelIds = new Set(currentGroup.links?.map(link => link.channelId) || []);
  const channelsInGroup = channels.filter(ch => channelIds.has(ch.channelId));
  
  const emptyFolder = channelsInGroup.length === 0;
  
  return (
    <div>

    <div className="container mx-auto px-4 py-2">
        <div>
            {!emptyFolder ? (
              <div className="text-3xl lg:text-5xl font-bold text-white mb-8 text-center">
                 {currentGroup.name}
              </div>
            ) : (
              <div className="text-3xl lg:text-5xl font-bold text-white mb-8 text-center">
                 {currentGroup.name}
                    <div className="text-base md:text-xl font-normal text-gray-500 mb-8 text-center pt-4"> Click on edit to add channels in this group </div>
              </div>
            )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 mx-4">
                  {channelsInGroup.map((channel, index) => (
                      <div
                      key={index}
                      className="group relative bg-gradient-to-br from-white/20 to-white/5 
                                backdrop-blur-xl rounded-2xl p-6 shadow-lg 
                                flex flex-col items-center 
                                transition-transform transform hover:scale-105 
                                hover:shadow-xl"
                      >
                          <Image
                              src={channel.meta.logo || "https://via.placeholder.com/150"}
                              alt={channel.meta.name || "loading..."}
                              width={96}
                              height={96}
                              className="w-24 h-24 rounded-full mb-4 object-cover 
                   ring-2 ring-white/40 shadow-md"
                          />
                          <h2 className="text-lg font-semibold text-white mb-1">
                              {channel.meta.name}
                          </h2>
                     </div>
                  ))}
        </div>
    </div>
    
    <div className='fixed bottom-0 w-full p-6 md:p-11 
                  bg-gray-900/95 backdrop-blur-sm
                  border-t border-white/10
                  shadow-[0_-4px_24px_0_rgba(0,0,0,0.5)]  
    '>  
        <div className='flex items-center justify-center gap-4'>   
        <button
        className='px-6 md:px-11 py-3 rounded-xl font-semibold text-white 
                      bg-gray-600 
                      hover:bg-gray-700
                      shadow-lg hover:shadow-xl 
                      transition-all duration-200 
                      hover:scale-[1.02] active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-white/50'
        onClick={() => setGroupEditView(true)}
        >Edit group
        </button>
        <button
        className='px-7 md:px-11 py-3 rounded-xl font-semibold text-white 
                      bg-gray-600 
                      hover:bg-gray-700
                      shadow-lg hover:shadow-xl 
                      transition-all duration-200 
                      hover:scale-[1.02] active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-white/50'
        onClick={() => setGroupChannelView(false)}
        >Go back
        </button>
        </div> 
        </div>  

    </div>
  )
}

export default GroupChannelList