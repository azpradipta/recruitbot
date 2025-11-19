import React from 'react'
import Image from 'next/image'

function Interview() {
  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
        <div className='flex flex-col justify-center border rounded-lg bg-white'>
             <Image src={'/logo.png'} alt="logo" width={200} height={100} className='w-[100px]'/>
             <h2>AI-Powered Interview Platform</h2>
        </div>
    </div>
  )
}

export default Interview