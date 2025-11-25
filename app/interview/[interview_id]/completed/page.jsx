"use client"
import { CheckCircle2, Mail, Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

function InterviewCompleted() {
  const { interview_id } = useParams()
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }))
  }, [])

  return (
    <div className='min-h-screen bg-white flex items-center justify-center p-6'>
      <div className='max-w-2xl w-full'>
        
        {/* Main Card */}
        <div className='text-center space-y-8'>
          
          {/* Success Icon */}
          <div className='flex justify-center'>
            <CheckCircle2 className='w-20 h-20 text-green-500' />
          </div>

          {/* Title */}
          <div className='space-y-3'>
            <h1 className='text-4xl font-bold text-gray-900'>
              Interview Completed!
            </h1>
            <p className='text-gray-600 text-lg'>
              Thank you for completing your interview session
            </p>
          </div>

          {/* Interview Info */}
          <div className='inline-flex items-center gap-4 px-6 py-3 bg-gray-50 rounded-lg'>
            <div className='text-left'>
              <p className='text-xs text-gray-500'>Interview ID</p>
              <p className='font-mono font-semibold text-gray-900'>#{interview_id}</p>
            </div>
            <div className='w-px h-10 bg-gray-300' />
            <div className='text-left'>
              <p className='text-xs text-gray-500'>Completed</p>
              <p className='text-sm font-medium text-gray-900'>{currentTime}</p>
            </div>
          </div>

          {/* What's Next */}
          <div className='text-left max-w-xl mx-auto space-y-6 pt-4'>
            <div className='flex items-center gap-2'>
              <Mail className='w-5 h-5 text-primary' />
              <h3 className='font-semibold text-gray-900'>What Happens Next?</h3>
            </div>
            
            <div className='space-y-4'>
              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold'>
                  1
                </div>
                <div className='pt-1'>
                  <p className='text-gray-700'>
                    Your interview has been analyzed by our AI system
                  </p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold'>
                  2
                </div>
                <div className='pt-1'>
                  <p className='text-gray-700'>
                    The hiring team will review your performance report
                  </p>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold'>
                  3
                </div>
                <div className='pt-1'>
                  <p className='text-gray-700'>
                    You'll receive an email within 3-5 business days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className='bg-blue-50 border-l-4 border-primary rounded-r-lg p-6 text-left max-w-xl mx-auto'>
            <div className='flex gap-3'>
              <Clock className='w-5 h-5 text-primary flex-shrink-0 mt-0.5' />
              <div className='space-y-2'>
                <p className='font-medium text-gray-900'>Important Information</p>
                <ul className='space-y-1 text-sm text-gray-700'>
                  <li>• Keep reference number <span className='font-mono font-semibold'>#{interview_id}</span></li>
                  <li>• Check your email (including spam folder) regularly</li>
                  <li>• Your data is stored securely and confidentially</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className='pt-8 space-y-2'>
            <p className='text-gray-600'>
              Thank you for your time and interest in this position
            </p>
            <p className='text-sm text-gray-500'>
              You may close this window now. Best of luck! 🍀
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default InterviewCompleted