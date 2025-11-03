import React from 'react'

const GroupForm = ({ groupName, createGroup, setGroupName, router }) => {
  return (
    <div className='
      fixed bottom-0 w-full p-6 
  bg-gray-900/95 backdrop-blur-sm
  border-t border-white/10
  shadow-[0_-4px_24px_0_rgba(0,0,0,0.5)] 
    '>
        
        <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl md:text-5xl font-bold
         text-white text-center drop-shadow-lg py-5'>
        Create a new group</h1>

        <input
        type="url"
        className="w-full md:w-1/2 lg:w-1/3 h-12 p-4 mb-5 rounded-2xl shadow-md
                  bg-gradient-to-r from-gray-800 to-gray-700 text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900
                  transition-all duration-300 ease-in-out"
        placeholder="Enter your Group name..."
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        />
        
        <div className='flex items-center justify-center gap-4'>
        <button
        className='px-11 py-3 mb-5 rounded-xl font-semibold text-white 
                      bg-gray-600 
                      hover:bg-gray-700
                      shadow-lg hover:shadow-xl 
                      transition-all duration-200 
                      hover:scale-[1.02] active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-white/50'
        onClick={() => {
          if(groupName === "")
          {
            alert("Group name cant be empty!");
            return;
          }
          createGroup(groupName);
          setGroupName('');
        }}
        >Create group</button>
        <button
        className='px-11 py-3 mb-5 rounded-xl font-semibold text-white 
                      bg-gray-600 
                      hover:bg-gray-700
                      shadow-lg hover:shadow-xl 
                      transition-all duration-200 
                      hover:scale-[1.02] active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-white/50'
        onClick={() => {
          router.push('/feed');
        }}
        >Go to Feed</button>
        </div>
        </div>  
        </div>
  )
}

export default GroupForm