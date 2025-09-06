'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter} from "next/navigation";

const page = () => {
  
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();


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
                console.error('Error response:', data);
            }
            console.log('Response data:', data);
            setLink('');
        }
        catch(err){
            console.error('Error submitting links:', err);
            alert('Something went wrong!');
        }
    }

  return (
    <>
    <div className='min-h-screen bg-gradient-to-r from-[#FF8235] to-[#30E8BF] p-4'>

        <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-2xl md:text-5xl font-bold
         text-white text-center drop-shadow-lg py-5'>
        Enter your channel links here</h1>

        <input
        type="url"
        className="w-full md:w-1/2 lg:w-1/3 h-12 p-4 rounded-2xl shadow-md
                  bg-gradient-to-r from-gray-800 to-gray-700 text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900
                  transition-all duration-300 ease-in-out"
        placeholder="Enter your channel link..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
        />

        <button
        className='px-8 py-3 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-red-400 to-pink-500 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-pink-400'
        onClick={() => handleSubmit()}
        >Submit</button>
        </div>  

    </div>
    </>
  )
}

export default page
