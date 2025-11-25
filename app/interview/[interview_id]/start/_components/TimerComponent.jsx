"use client"
import { Timer } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function TimerComponent({ isCallActive }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    
    if (isCallActive) {
      // Start timer when call is active
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // Reset timer when call ends
      setTime(0);
    }

    // Cleanup interval on unmount or when call status changes
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCallActive]);

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <span className='flex gap-2 items-center'>
      <Timer className='h-5 w-5 text-black'/>
      <span className='font-medium text-black'>
        {formatTime(time)}
      </span>
    </span>
  )
}

export default TimerComponent