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
    <div>
        <h1>Enter your channel links here</h1>

        <textarea
        className='w-full h-40 p-2 border border-gray-300 rounded-lg'
        placeholder='Enter your channel links here'
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button
        className='bg-blue-500 text-white p-2 rounded-lg ml-4'
        onClick={() => handleSubmit()}
        >Submit</button>
    </div>
    </>
  )
}

export default page
