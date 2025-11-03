import React, { useState } from 'react'
import GroupCard from './GroupCard';

const GroupSelectForm = ({ groups, filterList, addToFilterList, removefromFilterList, setGroupSelectorView }) => {
  
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
        <div className='fixed bottom-0 w-full p-10 
  bg-gray-900/95 backdrop-blur-sm
  border-t border-white/10
  shadow-[0_-4px_24px_0_rgba(0,0,0,0.5)]'>
        
        <div className='flex flex-row items-center justify-center gap-4'>

        <button
        className='px-11 py-3 mb-2 rounded-xl font-semibold text-white 
                      bg-gray-600 
                      hover:bg-gray-700
                      shadow-lg hover:shadow-xl 
                      transition-all duration-200 
                      hover:scale-[1.02] active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-white/50'
        onClick={() => {
                setGroupSelectorView(false);    
        }}
        >Go with All Channels</button>
        <button
        className='px-11 py-3 mb-2 rounded-xl font-semibold text-white 
                  bg-gray-600 
                  hover:bg-gray-700
                  shadow-lg hover:shadow-xl 
                  transition-all duration-200 
                  hover:scale-[1.02] active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-white/50'
        onClick={() => {
                if(filterList.length == 0){
                  alert("Select a group to continue");
                }else{
                setGroupSelectorView(false); 
                }
        }}
        >Confirm Selection</button>
        </div>  
        </div>
    </div>
  )
}

export default GroupSelectForm