"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null); 
  const [activeUser, setActiveUser] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  // Initialize Vapi 
  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
      
      // Setup event listeners 
      vapiRef.current.on("call-start", () => {
        console.log("✅ Call has started.");
        toast.success('Call Connected...');
        setIsCallActive(true);
      });

      vapiRef.current.on("speech-start", () => {
        console.log("🎤 Assistant speech has started.");
        setActiveUser(false);
      });

      vapiRef.current.on("speech-end", () => {
        console.log("🔇 Assistant speech has ended.");
        setActiveUser(true);
      });

      vapiRef.current.on("call-end", () => {
        console.log("❌ Call has ended.");
        toast.info('Interview Ended');
        setIsCallActive(false);
      });

      vapiRef.current.on("error", (error) => {
        console.error("⚠️ Vapi Error:", error);
        toast.error('Interview error occurred');
      });
    }

    return () => {
      if (vapiRef.current && isCallActive) {
        console.log("🧹 Cleaning up Vapi on unmount");
        vapiRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (interviewInfo && !isCallActive) {
      startCall();
    }
  }, [interviewInfo]);

  const startCall = () => {
    let questionList = '';
    interviewInfo?.interviewData?.questionList.forEach((item) => {
      questionList = item?.question + ", " + questionList;
    });

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: "Hi " + interviewInfo?.userName + ", how are you? Ready for your interview on " + interviewInfo?.interviewData?.jobPosition,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
            You are an AI voice assistant conducting interviews.
            Your job is to ask candidates provided interview questions, assess their responses.
            Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
            "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"
            Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
            Questions: ${questionList}
            If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
            "Need a hint? Think about how React tracks component updates!"
            Provide brief, encouraging feedback after each answer. Example:
            "Nice! That's a solid answer."
            "Hmm, not quite! Want to try again?"
            Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
            After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
            "That was great! You handled some tough questions well. Keep sharpening your skills!"
            End on a positive note:
            "Thanks for chatting! Hope to see you crushing projects soon!"
            Key Guidelines:
            ✅ Be friendly, engaging, and witty 🎤
            ✅ Keep responses short and natural, like a real conversation
            ✅ Adapt based on the candidate's confidence level
            ✅ Ensure the interview remains focused on ${interviewInfo?.interviewData?.jobPosition}
            `.trim(),
          },
        ],
      },
    };

    console.log("🚀 Starting Vapi call...");
    vapiRef.current?.start(assistantOptions);
  }

  const stopInterview = () => {
    console.log("🛑 Stopping interview manually...");
    if (vapiRef.current) {
      vapiRef.current.stop();
      setIsCallActive(false);
      toast.info('Call ended by user');
    }
  }

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
        <span className='flex gap-2 items-center'>
          <Timer className='h-5 w-5'/>
          00:00:00
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        {/* AI Recruiter */}
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
          <div className='relative'>
            {!activeUser && isCallActive && (
              <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'/>
            )}
            <Image 
              src={'/ai.png'} 
              alt='ai' 
              width={200} 
              height={200} 
              quality={100}
              className='w-[60px] h-[60px] rounded-full object-cover'
            />
          </div>
          <h2 className='font-medium'>AI Recruiter</h2>
        </div>

        {/* User */}
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
          <div className='relative'>
            {activeUser && isCallActive && (
              <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'/>
            )}
            <h2 className='w-[60px] h-[60px] bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold'>
              {interviewInfo?.userName?.[0]?.toUpperCase()}
            </h2>
          </div>
          <h2 className='font-medium'>{interviewInfo?.userName}</h2>
        </div>
      </div>

      {/* Controls */}
      <div className='flex items-center gap-5 justify-center mt-7'>
        {/* Mic Button */}
        <div className='h-14 w-14 bg-gray-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors'>
          <Mic className='h-6 w-6 text-white'/>
        </div>

        {/* End Call Button */}
        <AlertConfirmation stopInterview={stopInterview}>
          <div className='h-14 w-14 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors'>
            <Phone className='h-6 w-6 text-white'/>
          </div>
        </AlertConfirmation>
      </div>

      <h2 className='text-sm text-gray-400 text-center mt-5'>
        {isCallActive ? 'Interview in Progress...' : 'Connecting...'}
      </h2>
    </div>
  )
}

export default StartInterview