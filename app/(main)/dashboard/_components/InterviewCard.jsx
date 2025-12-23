import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, Copy, Trash2 } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/service/supabaseClient'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function InterviewCard({ interview, viewDetail=false, showCandidateCount = false, onDelete }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        toast('Copied')
    }

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    }

    const handleConfirmDelete = async () => {
        setDeleteLoading(true);
        try {
            // Hapus semua candidates/feedback terlebih dahulu
            const { error: feedbackError } = await supabase
                .from('interview-feedback')
                .delete()
                .eq('interview_id', interview?.interview_id);

            if (feedbackError) {
                console.error('Error deleting feedback:', feedbackError);
                throw feedbackError;
            }

            // Baru hapus interview
            const { error: interviewError } = await supabase
                .from('Interviews')
                .delete()
                .eq('interview_id', interview?.interview_id);

            if (interviewError) {
                console.error('Error deleting interview:', interviewError);
                throw interviewError;
            }

            toast.success('Interview deleted successfully');
            if (onDelete) {
                onDelete(interview?.interview_id);
            }
            setShowDeleteDialog(false);
        } catch (error) {
            console.error('Error deleting interview:', error);
            toast.error('Failed to delete interview. Please try again.');
        } finally {
            setDeleteLoading(false);
        }
    }

    return (
        <>
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
                            <Copy className='w-4 h-4 mr-2' /> Copy Link
                        </Button>
                        <Button 
                            variant='outline' 
                            className={'w-full'} 
                            onClick={handleDeleteClick}
                            disabled={deleteLoading}
                        >
                            <Trash2 className='w-4 h-4 mr-2' />
                            {deleteLoading ? 'Deleting...' : 'Delete'}
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

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl">Delete Interview?</AlertDialogTitle>
                        <AlertDialogDescription className="text-base">
                            This action cannot be undone. This will permanently delete the interview and all candidate feedback from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 sm:gap-2">
                        <AlertDialogCancel disabled={deleteLoading} className="mt-0">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleConfirmDelete}
                            disabled={deleteLoading}
                            className="bg-gray-900 text-white hover:bg-gray-800"
                        >
                            {deleteLoading ? 'Deleting...' : 'Delete Interview'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default InterviewCard