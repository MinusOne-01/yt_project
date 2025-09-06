'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter} from "next/navigation";

const page = () => {
  
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // fetch existing links on mount
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await fetch('/api/links'); // GET handler
                if (res.ok) {
                    const data = await res.json();
                    // fill textarea with urls separated by newlines
                    setText(data.links.map((l) => l.url).join('\n'));
                }
            } catch (err) {
                console.error('Error fetching links:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, []);

    const handleSubmit =  async () => {
        const linksArray = text.split('\n').map(link => link.trim()).filter(link => link !== '');

        try{
            const res = await fetch('/api/youtube',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ links: linksArray }),
            }).then(res => res.json());

            console.log('Recieved back:', res);
            router.push('/feed');
        }
        catch(err){
            console.error('Error submitting links:', err);
        }
    }

  return (
    <>
    <div className='min-h-screen bg-gradient-to-r from-[#FF8235] to-[#30E8BF] p-4'>
        <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-2xl md:text-5xl font-bold
         text-white text-center drop-shadow-lg py-5'>
        Enter your channel links here</h1>

        <textarea className="w-full md:w-1/2 lg:w-1/3 h-40 p-4 rounded-2xl shadow-md 
                 bg-gradient-to-r from-gray-800 to-gray-700  text-white placeholder-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900
                 transition-all duration-300 ease-in-out resize-none"
            placeholder="Enter your channel links here..."
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
        ></textarea>


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
