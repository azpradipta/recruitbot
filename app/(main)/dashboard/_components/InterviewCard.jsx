import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, Copy, Send } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview, viewDetail=false, showCandidateCount = false }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        toast('Copied')
    }

    const onSend = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Recruitbot Interview',
                text: `Here is your interview link:`,
                url: url
            });
        } catch (error) {
            console.log("Share cancelled", error);
        }
    } else {
        navigator.clipboard.writeText(url);
        toast('Link copied to clipboard');
    }
}


       return (
        <div className='p-5 bg-white rounded-lg border'>
            <div className='flex items-center justify-between'>
                <div className='h-[40px] w-[40px] bg-primary rounded-full flex items-center justify-center'>
                    <Briefcase className='w-5 h-5 text-white' />
                </div>
                <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyyy')}</h2>
            </div>
            <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
            <h2 className='mt-2 flex justify-between text-gray-500'>
                {interview?.duration}
                {showCandidateCount && (
                    <span className='text-green-600'>
                        {interview['interview-feedback']?.length} Candidates
                    </span>
                )}
            </h2>
            {!viewDetail ? (
                <div className='grid grid-cols-2 gap-3 mt-5'>
                    <Button variant='outline' className={'w-full'} onClick={copyLink}>
                        <Copy /> Copy Link
                    </Button>
                    <Button className={'w-full'} onClick={onSend}>
                        <Send /> Send
                    </Button>
                </div>
            ) : (
                <Link href={'/scheduled-interview/' + interview?.interview_id + '/details'}>
                    <Button className="mt-5 w-full" variant="outline">
                        View Detail <ArrowRight />
                    </Button>
                </Link>
            )}
        </div>
    )
}

export default InterviewCard