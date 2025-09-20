import React from 'react'

const ChannelList = ({channels, delChannel, Image}) => {
  //console.log(channels);
  return (
    <div className="container mx-auto px-4 py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  {channels.map((channel, index) => (
                      <div
                          key={index}
                          className="group relative bg-gradient-to-br from-white/20 to-white/5 
                 backdrop-blur-xl rounded-2xl p-6 shadow-lg 
                 flex flex-col items-center 
                 transition-transform transform hover:scale-105 
                 hover:shadow-xl"
                      >
                        <button
                          className="absolute top-1 right-3 text-white/70 
                 opacity-0 group-hover:opacity-100 
                 transition-opacity duration-200 hover:text-red-500"
                            onClick={() => delChannel(channel.channelId)}
                        >
                          &times;
                        </button>

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
  )
}

export default ChannelList