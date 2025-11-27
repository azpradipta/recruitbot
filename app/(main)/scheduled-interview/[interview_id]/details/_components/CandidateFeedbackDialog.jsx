import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

function CandidateFeedbackDialog({candidate}) {
    const feedback = candidate?.feedback?.feedback
    
    const calculateAverage = () => {
        if (!feedback?.rating) return 0
        
        const { technicalSkills, communication, problemSolving, experience } = feedback.rating
        const total = (technicalSkills || 0) + (communication || 0) + (problemSolving || 0) + (experience || 0)
        const average = total / 4
        
        return average.toFixed(1) 
    }
    
    const averageRating = calculateAverage()
    
  return (
    <Dialog>
        <DialogTrigger asChild>
             <Button variant="outline" className="text-primary">View Report</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Feedback</DialogTitle>
                <DialogDescription asChild>
                    <div className='mt-5'>
                        <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-5'>
                            <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>
                                {candidate?.userName?.[0]?.toUpperCase() || 'C'}
                            </h2>
                            <div>
                                <h2 className='font-bold'>{candidate?.userName}</h2>
                                <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                            </div>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <h2 className='text-primary text-2xl font-bold'>{averageRating}/10</h2>
                        </div>    
                        </div>
                        <div className='mt-5'>
                            <h2 className='font-bold'>Skills Assessment</h2>
                            <div className='mt-3 grid grid-cols-2 gap-10'>
                                <div>
                                    <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.technicalSkills || 0}/10</span></h2>
                                    <Progress value={(feedback?.rating?.technicalSkills || 0) * 10} className='mt-1'/>
                                </div>
                                <div>
                                    <h2 className='flex justify-between'>Communication <span>{feedback?.rating?.communication || 0}/10</span></h2>
                                    <Progress value={(feedback?.rating?.communication || 0) * 10} className='mt-1'/>
                                </div>
                                <div>
                                    <h2 className='flex justify-between'>Problem Solving <span>{feedback?.rating?.problemSolving || 0}/10</span></h2>
                                    <Progress value={(feedback?.rating?.problemSolving || 0) * 10} className='mt-1'/>
                                </div>
                                <div>
                                    <h2 className='flex justify-between'>Experience <span>{feedback?.rating?.experience || 0}/10</span></h2>
                                    <Progress value={(feedback?.rating?.experience || 0) * 10} className='mt-1'/>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <h2 className='font-bold'>Performance Summary</h2>
                            <div className='p-5 bg-secondary my-3 rounded-md'>
                                <p className='text-sm'>{feedback?.summary}</p>
                            </div>
                        </div>
                        <div className={`p-5 mt-5 flex items-center justify-between rounded-md ${feedback?.recommendation === 'No' ? 'bg-red-100' : 'bg-green-100'}`}>
                            <div>
                                <h2 className={`font-bold ${feedback?.recommendation === 'No' ? 'text-red-700' : 'text-green-700'}`}>
                                    Recommendation:
                                </h2>
                                <p className={`text-sm ${feedback?.recommendation === 'No' ? 'text-red-500' : 'text-green-500'}`}>
                                    {feedback?.recommendationMsg}
                                </p>
                            </div>
                            {/* <Button className={`${feedback?.recommendation === 'No' ? 'bg-red-700 hover:bg-red-800' : 'bg-green-700 hover:bg-green-800'}`}>
                                Send Msg
                            </Button> */}
                        </div>   
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CandidateFeedbackDialog