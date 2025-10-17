"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/service/supabaseClient'
import Image from 'next/image'
import React from 'react'

function Login() {

  // Used to Sign In With Google
  const signInWithGoogle = async () => {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      console.error('Error signing in:', error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-8'>
        <Image src={'/logo.png'} alt="Logo"
          width={400} 
          height={100}
          className='w-[180px]'
        />
        <div className='flex items-center flex-col'>
          <Image src={'/login.png'} alt="Login"
            width={600} 
            height={400}
            className='w-[400px] h-[250px] rounded-2xl'
          />
          <h2 className='text-2xl font-bold text-center mt-5'>Welcome to Recruitbot</h2>
          <p className='text-gray-500 text-center'>Sign In With Google Authentication</p>
          <Button className='mt-7 w-full' onClick={signInWithGoogle}>Login With Google</Button>
        </div>
      </div>
    </div>
  )
}

export default Login