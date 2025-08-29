'use client'

import React from 'react'
import { useState } from 'react'

const page = () => {

    const [text, setText] = useState('');

    const handleSubmit =  async () => {
        const linksArray = text.split('\n').map(link => link.trim()).filter(link => link !== '');

        try{
            const res = await fetch('/api/youtube',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ links: linksArray }),
            }).then(res => res.json());

            console.log('Response:', res);
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
