'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter} from "next/navigation";

const page = () => {
  
    const [link, setLink] = useState('');
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        async function fetchChannels(){
            try{
                const res = await fetch('/api/database',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                }); 
                const data = await res.json();
                if(res.ok){
                    setChannels(data);
                    console.log('Channels fetched successfully:', data);
                } else {
                    console.error('Error fetching channels:', data);
                }
            }
            catch(err){
                console.error('Error fetching channels:', err);
            }
        }
        fetchChannels();
    }, []);

    const handleSubmit =  async () => {
        try{
            const res = await fetch('/api/database',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url : link}),
            });

            const data = await res.json();
            if(res.ok){
                alert('Link submitted successfully!');
            } else {
                alert(data.error || 'Recieved back data but some error occured');
                return;
            }
            console.log('Response data:', data);
            setChannels([...channels, data]);
            setLink('');
        }
        catch(err){
            console.error('Error submitting links:', err);
            alert('Something went wrong!');
        }
    }

    const handleDelete = async (id) => {
        try{
            const res = await fetch('/api/database',{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id}),
            });
            const data = await res.json();
            if(res.ok){
                alert('Link deleted successfully!');
                setChannels(channels.filter(channel => channel.channelId !== id));
            } else {
                alert(data.error || 'Recieved back data but some error occured');
            }
            console.log('Response data:', data);
        }
        catch(err){
            console.error('Error deleting links:', err);
            alert('Something went wrong!');
        }
    }

  return (
    <>
    <div className='min-h-screen bg-gradient-to-r from-[#FF8235] to-[#30E8BF] pb-40'>

         {/*Display channels in a responsive grid*/}     
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
                            onClick={() => handleDelete(channel.channelId)}
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
        onClick={() => handleSubmit()}
        >Submit</button>
        </div>  
        </div>

    </div>
    </>
  )
}

export default page
