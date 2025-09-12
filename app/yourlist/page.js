'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter} from "next/navigation";
import useChannels from '@/hooks/useChannels';
import useGroups from '@/hooks/useGroups';
import Link from 'next/link';

const page = () => {
    
    const { channels, error, addChannel, delChannel } = useChannels();
    const { groups, createGroup } = useGroups();
    const [link, setLink] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupView, setGroupView] = useState("off");
    const router = useRouter();

  return (
    <>
    <div className='min-h-screen bg-gradient-to-r from-[#FF8235] to-[#30E8BF] pb-40'>

       {/* Buttons to toggle group view */}
        <div className="p-8 flex flex-col items-center">
      {/* Glass container for the toggle */}
      <div className="relative flex w-64 rounded-2xl p-1 bg-white/10 backdrop-blur-xl shadow-lg">
        {/* Sliding highlight */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-xl bg-white/20 backdrop-blur-md transition-all duration-300`}
          style={{
            left: groupView === "off" ? "0.25rem" : "50%",
          }}
        />
        <button
          onClick={() => setGroupView("off")}
          className={`relative z-10 flex-1 px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
            groupView === "off" ? "text-white" : "text-white/70"
          }`}
        >
          All channels
        </button>
        <button
          onClick={() => setGroupView("on")}
          className={`relative z-10 flex-1 px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
            groupView === "on" ? "text-white" : "text-white/70"
          }`}
        >
          Groups
        </button>
      </div>
      </div>

         {/*Display channels in a responsive grid*/}      
            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${
                           groupView === "off" ? "opacity-100" : "opacity-0"
             }`}>   
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

                          <img
                              src={channel.meta.logo || "https://via.placeholder.com/150"}
                              alt={channel.meta.name || "Channel Logo"}
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

        {/*Input section fixed at bottom*/}
              <div className='fixed bottom-0 w-full p-4 
    bg-gradient-to-r from-gray-900 to-gray-800 
    md:mb-50 md:bg-transparent'>
        
        <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl md:text-5xl font-bold
         text-white text-center drop-shadow-lg py-5'>
        Enter your channel links here</h1>

        <input
        type="url"
        className="w-full md:w-1/2 lg:w-1/3 h-12 p-4 mb-5 rounded-2xl shadow-md
                  bg-gradient-to-r from-gray-800 to-gray-700 text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900
                  transition-all duration-300 ease-in-out"
        placeholder="Enter your channel link..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
        />

        <button
        className='px-8 py-3 mb-5 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-red-400 to-pink-500 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-pink-400'
        onClick={() => {
          addChannel(link);
          setLink('');
        }}
        >Submit</button>
        </div>  
        </div>
        </div>
              
              {/*Create First group*/} 
              <div className={`transition-all duration-500 ease-in-out ${
    groupView === "on" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
  }`}>
              {groups.length === 0 ? (

                <div>
                  <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-2xl md:text-5xl font-bold
                                text-white drop-shadow-lg py-5'>
                       Create your first group
                   </h2>
                   <input
                  type="url"
                  className="w-full md:w-1/2 lg:w-1/3 h-12 p-4 mb-5 rounded-2xl shadow-md
                  bg-gradient-to-r from-gray-800 to-gray-700 text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900
                  transition-all duration-300 ease-in-out"
                  placeholder="Enter a name..."
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                /> 
                   <button
                  className='px-8 py-3 mb-5 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-red-400 to-pink-500 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-pink-400'
                   onClick={() => createGroup(groupName)} >
                    Submit
                  </button>
                  </div>
                </div>

              ) : (
              
              <div>                
                  <div className="container mx-auto px-4 py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  {groups.map((group, index) => (
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

             
 


              </div>
                )}


              </div>

    </div>
    </>
  )
}

export default page
