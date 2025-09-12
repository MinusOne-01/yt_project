import React from 'react'

const ChannelForm = ({ link, setLink, addChannel}) => {
  return (
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
  )
}

export default ChannelForm