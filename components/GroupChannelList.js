import React from 'react'

const GroupChannelList = ({ groups, groupFolderId, channels, setGroupEditView }) => {

  const currentGroup = groups.find(g => g.id === groupFolderId);
  if (!currentGroup) {
  return <div>Loading group...</div>;
  }
  
  return (
    <div>

    <div className="container mx-auto px-4 py-5">
        <h1>Inside { currentGroup.name } </h1>
    </div>
    
    <div className='fixed flex items-center justify-center  bottom-0 w-full p-4 
    bg-gradient-to-r from-gray-900 to-gray-800 
    md:mb-50 md:bg-transparent'>
        
        <button
        className='px-8 py-3 mb-5 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-red-400 to-pink-500 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-pink-400'
        onClick={() => setGroupEditView("on")}
        >Add Channels
        </button>
        </div>  

    </div>
  )
}

export default GroupChannelList