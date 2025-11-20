import React from 'react'

const ChannelList = ({channels, delChannel, Image}) => {
  
  if(channels.length == 0){
     return(
       <div className="container mx-auto px-4 py-5">
         <p className="text-base md:text-xl text-gray-500 leading-relaxed text-center">
           Your channels will appear here
         </p>
         <p className="text-base md:text-xl text-gray-500 leading-relaxed text-center">
          To add one, enter any video link from that channel and click "Submit"
        </p>
       </div>
     )
  }

  return (
    <div className="container mx-auto px-4 py-5">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 mx-4">
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
                                  opacity-100 md:opacity-0 md:group-hover:opacity-100 
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
                          <h2 className="text-xs md:text-xl font-semibold text-white mb-1">
                              {channel.meta.name}
                          </h2>
                     </div>
                  ))}
              </div>
              </div>
  )
}

export default ChannelList