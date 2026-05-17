"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, MicOff, Phone } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import TimerComponent from './_components/TimerComponent';
import axios from 'axios';
import { supabase } from '@/service/supabaseClient';
import { useParams, useRouter } from 'next/navigation';

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null); 
  const conversationRef = useRef([]); 
  const [activeUser, setActiveUser] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [conversation, setConversation] = useState();
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [isMuted, setIsMuted] = useState(false); 

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
        GenerateFeedback();
        setIsCallActive(false);
      });

      vapiRef.current.on("message", (message) => {
        console.log(message?.conversation);
        conversationRef.current = message?.conversation; 
        setConversation(message?.conversation);
      });

      const GenerateFeedback = async () => {
        try { 
          const result = await axios.post('/api/ai-feedback', {
            conversation: conversationRef.current 
          });

          console.log(result?.data);
          
          const Content = result.data.feedback || result.data.content;
          
          let FINAL_CONTENT = Content
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
          
          console.log("Raw content:", FINAL_CONTENT);
          
          let feedbackData;
          try {
            feedbackData = JSON.parse(FINAL_CONTENT);
          } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.log("Content that failed:", FINAL_CONTENT);
            feedbackData = { 
              summary: FINAL_CONTENT,
              parseError: true 
            };
          }
          
          console.log("Parsed feedback:", feedbackData);
          
          // Save to Database
          const { data, error } = await supabase
            .from('interview-feedback')
            .insert([
              { 
                userName: interviewInfo?.userName, 
                userEmail: interviewInfo?.userEmail, 
                interview_id: interview_id,
                feedback: feedbackData, 
                recommended: false
              },
            ])
            .select();
          
          if (error) {
            console.error("Database error:", error);
            toast.error('Failed to save feedback');
            return;
          }
          
          console.log(data);
          toast.success('Feedback saved successfully!');
          router.replace('/interview/' + interview_id + "/completed");
          setLoading(false);
          
        } catch (error) { 
          console.error("❌ GenerateFeedback Error:", error);
          toast.error('Failed to generate feedback');
          setLoading(false);
        }
      }

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
  let totalQuestions = interviewInfo?.interviewData?.questionList?.length || 0;
  
  interviewInfo?.interviewData?.questionList.forEach((item, index) => {
    questionList += `${index + 1}. ${item?.question}\n`;
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
      provider: "openai",
      voiceId: "alloy",
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
          You are an AI voice assistant conducting interviews for ${interviewInfo?.interviewData?.jobPosition}.
          
          IMPORTANT RULES:
          ❌ You have EXACTLY ${totalQuestions} questions to ask - NO MORE, NO LESS
          ❌ Do NOT create additional questions
          ❌ Do NOT ask follow-up questions beyond the list
          ❌ After asking all ${totalQuestions} questions, give the CLOSING MESSAGE and WAIT for user to end the call
          
          Begin with a friendly introduction:
          "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. I have ${totalQuestions} questions for you. Let's get started!"
          
          Here are the ONLY questions you must ask (one at a time):
          ${questionList}
          
          Process for each question:
          1. Ask the question
          2. Wait for the answer
          3. Give brief feedback (5-10 words max): "Good answer!" or "Nice!" or "Great!"
          4. Move immediately to the next question
          5. Repeat until all ${totalQuestions} questions are done
          
          After the LAST question (question ${totalQuestions}):
          Say EXACTLY this closing message:
          "That completes all ${totalQuestions} questions for today's interview. Thank you so much for your time, ${interviewInfo?.userName}. I really appreciate your responses. You can now end the call whenever you're ready. Have a great day!"
          
          After giving the closing message:
          - Do NOT ask any more questions
          - Do NOT create follow-up questions
          - Just WAIT silently for the user to end the call
          - If user says something, just respond briefly: "Thank you! Feel free to end the call."
          
          Keep all responses SHORT and focused ONLY on the ${totalQuestions} questions provided.
          `.trim(),
        },
      ],
    },
  };

  console.log("🚀 Starting Vapi call...");
  vapiRef.current?.start(assistantOptions);
}

  const stopInterview = async () => {
    console.log("🛑 Stopping interview manually...");
    if (vapiRef.current) {
      vapiRef.current.stop();
      setIsCallActive(false);
      toast.info('Call ended by user');
    }
  }

  // <<< NEW: toggle mute mic >>>
  const toggleMute = () => {
    if (!vapiRef.current || !isCallActive) {
      toast.info('Call is not active');
      return;
    }

    const nextMuted = !isMuted;

    try {
      vapiRef.current.setMuted(nextMuted);
      setIsMuted(nextMuted);
      toast(nextMuted ? 'Microphone muted' : 'Microphone unmuted');
    } catch (error) {
      console.error('Error setting mute:', error);
      toast.error('Failed to change microphone state');
    }
  };

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
        <TimerComponent isCallActive={isCallActive} />
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
<div
  onClick={toggleMute}
  className={`h-14 w-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200
    ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'}`}
>
  {isMuted ? (
    <MicOff className="h-6 w-6 text-white" />
  ) : (
    <Mic className="h-6 w-6 text-white" />
  )}
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
