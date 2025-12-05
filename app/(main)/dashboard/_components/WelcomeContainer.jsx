"use client"
import { useUser } from '@/app/provider'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

function WelcomeContainer() {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Redirect to login
    router.push('/auth');
  }

  return (
    <div className='bg-white p-5 rounded-xl flex justify-between items-center'>
      <div>
        <h2 className='text-lg font-bold'>Welcome Back, {user?.name}</h2>
        <h2 className='text-gray-500'>AI-Driven Interview, Hassel-Free Hiring</h2>
      </div>
      
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0 h-auto">
              <Image 
                src={user?.picture} 
                alt='UserAvatar' 
                width={40} 
                height={40} 
                className='rounded-full cursor-pointer hover:ring-2 ring-primary transition-all' 
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{user?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
} 

export default WelcomeContainer