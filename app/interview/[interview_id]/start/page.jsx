"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer } from 'lucide-react';
import React, { useContext } from 'react'
import Image from 'next/image'

function StartInterview() {
  const{interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>AI Interview Session
        <span className='flex gap-2 items-center'>
          <Timer/>
          00:00:00
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center '>
          <Image src={'/ai.png'} alt='ai' width={100} height={100} className='w-[60px] h-[60px] rounded-full object-cover'/>
          <h2>AI Recruiter</h2>
        </div>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center '>
          <h2 className='w-[60px] h-[60px] bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold'>{interviewInfo?.userName[0]?.toUpperCase()}</h2>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>
     <div className='flex items-center gap-5 justify-center mt-7'>
        {/* Mic Button */}
        <button className='h-14 w-14 bg-gray-500 text-white rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-600 transition-colors'>
          <Mic className='h-6 w-6'/>
        </button>
        
        {/* End Call Button */}
        <button className='h-14 w-14 bg-red-500 text-white rounded-full cursor-pointer flex items-center justify-center hover:bg-red-600 transition-colors'>
          <Phone className='h-6 w-6'/>
        </button>
      </div>
      <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress...</h2>
    </div>
  )
}

export default StartInterview