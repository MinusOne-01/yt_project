import React, { useState } from 'react'
import GroupCard from './GroupCard';

const GroupSelectForm = ({ groups, addToFilterList, removefromFilterList, filterFeed, setGroupSelectorView }) => {
  
  return (
    <div>
        <div className="container mx-auto px-4 py-20">

        <h5 className="text-4xl md:text-3xl lg:text-5xl font-bold text-white mb-6 text-center">
            What do you want to watch?
        </h5>
              <div className="container mx-auto px-4 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                      {groups.map((group, index) => (

                       <GroupCard key={index} group={group} addToFilterList={addToFilterList} removefromFilterList={removefromFilterList} />

                     ))}
                  </div>
              </div>  
        </div>
        <div className='fixed bottom-0 w-full p-4 
    bg-gradient-to-r from-gray-900 to-gray-800 
    md:mb-50 md:bg-transparent'>
        
        <div className='flex flex-row items-center justify-center gap-3'>

        <button
        className='px-8 py-3 mb-5 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-red-400 to-pink-500 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-pink-400'
        onClick={() => {
                setGroupSelectorView(false);    
        }}
        >Select All</button>
        <button
        className='px-8 py-3 mb-5 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-red-400 to-pink-500 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-pink-400'
        onClick={() => {
                filterFeed();
                setGroupSelectorView(false); 
        }}
        >Build you Feed</button>
        </div>  
        </div>
    </div>
  )
}

export default GroupSelectForm