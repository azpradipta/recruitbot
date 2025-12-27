import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/service/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

function FormContainer({onHandleInputChange, GoToNext }) {

  const [interviewType, setInterviewType] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    jobPosition: '',
    jobDescription: '',
    duration: '',
    type: []
  });
  
  useEffect(() => {
    if (interviewType) {
        onHandleInputChange('type', interviewType)
        setFormData(prev => ({ ...prev, type: interviewType }))
    }  
  },[interviewType])
  
  const AddInterviewType=(type)=>{
    const data=interviewType.includes(type);
    if(!data){
        setInterviewType(prev=>[...prev,type])
    }else{
        const result=interviewType.filter(item=>item!=type);
        setInterviewType(result);
    }    
  }

  // Validasi Job Position (hanya huruf, spasi, dan karakter khusus tertentu)
  const validateJobPosition = (value) => {
    if (!value.trim()) {
      return 'Job Position is required';
    }
    // Tidak boleh hanya angka
    if (/^\d+$/.test(value)) {
      return 'Job Position cannot contain only numbers';
    }
    // Harus mengandung huruf
    if (!/[a-zA-Z]/.test(value)) {
      return 'Job Position must contain letters';
    }
    return '';
  };

  // Validasi Job Description
  const validateJobDescription = (value) => {
    if (!value.trim()) {
      return 'Job Description is required';
    }
    return '';
  };

  // Validasi Duration
  const validateDuration = (value) => {
    if (!value) {
      return 'Interview Duration is required';
    }
    return '';
  };

  // Validasi Interview Type
  const validateInterviewType = (value) => {
    if (!value || value.length === 0) {
      return 'Please select at least one Interview Type';
    }
    return '';
  };

  // Handle input change dengan validasi
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    onHandleInputChange(field, value);

    // Clear error saat user mulai mengetik
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validasi semua field sebelum next
  const validateForm = () => {
    const newErrors = {};

    const jobPositionError = validateJobPosition(formData.jobPosition);
    if (jobPositionError) newErrors.jobPosition = jobPositionError;

    const jobDescriptionError = validateJobDescription(formData.jobDescription);
    if (jobDescriptionError) newErrors.jobDescription = jobDescriptionError;

    const durationError = validateDuration(formData.duration);
    if (durationError) newErrors.duration = durationError;

    const interviewTypeError = validateInterviewType(interviewType);
    if (interviewTypeError) newErrors.type = interviewTypeError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next dengan validasi
  const handleNext = () => {
    if (validateForm()) {
      GoToNext();
    } else {
      toast.error('Oops! Some fields need your attention');
    }
  };

  return (
    <div className='p-5 bg-white rounded-xl'>
        <div>
            <h2 className='text-sm font-medium'>
              Job Position <span className='text-red-500'>*</span>
            </h2>
            <Input 
              placeholder="e.g. Backend Developer" 
              className={`mt-2 ${errors.jobPosition ? 'border-red-500' : ''}`}
              value={formData.jobPosition}
              onChange={(event) => handleInputChange('jobPosition', event.target.value)}
            />
            {errors.jobPosition && (
              <p className='text-red-500 text-xs mt-1'>{errors.jobPosition}</p>
            )}
        </div>

        <div className='mt-5'>
            <h2 className='text-sm font-medium'>
              Job Description <span className='text-red-500'>*</span>
            </h2>
            <Textarea 
              placeholder='Enter details job description here...' 
              className={`h-[200px] mt-2 ${errors.jobDescription ? 'border-red-500' : ''}`}
              value={formData.jobDescription}
              onChange={(event) => handleInputChange('jobDescription', event.target.value)}
            />
            {errors.jobDescription && (
              <p className='text-red-500 text-xs mt-1'>{errors.jobDescription}</p>
            )}
        </div>

        <div className='mt-5'>
            <h2 className='text-sm font-medium'>
              Interview Duration <span className='text-red-500'>*</span>
            </h2>
            <Select 
              onValueChange={(value) => handleInputChange('duration', value)}
              value={formData.duration}
            >
                <SelectTrigger className={`w-full mt-2 ${errors.duration ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5 Min">5 Min</SelectItem>
                    <SelectItem value="15 Min">15 Min</SelectItem>
                    <SelectItem value="30 Min">30 Min</SelectItem>
                    <SelectItem value="45 Min">45 Min</SelectItem>
                    <SelectItem value="60 Min">60 Min</SelectItem>
                </SelectContent>
            </Select>
            {errors.duration && (
              <p className='text-red-500 text-xs mt-1'>{errors.duration}</p>
            )}
        </div>

         <div className='mt-5'>
            <h2 className='text-sm font-medium'>
              Interview Type <span className='text-red-500'>*</span>
            </h2>
            <div className='flex gap-3 flex-wrap mt-2'>
                {InterviewType.map((type,index)=>(
                    <div key={index} 
                    className={`flex items-center cursor-pointer gap-2 p-1 px-4 bg-white border rounded-2xl hover:bg-secondary transition-colors
                      ${interviewType.includes(type.title) ? 'bg-blue-100 text-primary border-primary' : 'border-gray-300'}
                      ${errors.type ? 'border-red-300' : ''}`}
                    onClick={()=> AddInterviewType(type.title)}>
                        <type.icon className='h-4 w-4'/>
                        <span>{type.title}</span>
                    </div>
                ))}
            </div>
            {errors.type && (
              <p className='text-red-500 text-xs mt-1'>{errors.type}</p>
            )}
        </div>

        <div className='mt-7 flex justify-end'>
          <Button onClick={handleNext}>
            Generate Question <ArrowRight />
          </Button>
        </div>
    </div>
  )
}

export default FormContainer