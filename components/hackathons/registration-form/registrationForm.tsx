'use client';

import { Button } from '@/components/ui/button';
import {Form} from '@/components/ui/form';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/utils/cn';
import { RegisterFormStep3 } from './RegisterFormStep3';
import { RegisterFormStep2 } from './RegisterFormStep2';
import RegisterFormStep1 from './RegisterFormStep1';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';


export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  companyName: z.string().optional(),
  role: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  interests: z.array(z.string()).min(1, 'Interests are required'),
  web3Proficiency: z.string(),
  tools: z.array(z.string()), 
  roles: z.array(z.string()).optional(),
  languages: z.array(z.string()), 
  hackathonParticipation: z.string(),
  dietary: z.string().optional(),
  githubPortfolio: z.string().url('Set a valid URL').optional(),
  termsEventConditions: z.boolean().refine((value) => value === true, {
    message: 'You must accept the Event Terms and Conditions to continue.',
  }),
  newsletterSubscription: z.boolean().optional(),
  prohibitedItems: z.boolean().refine((value) => value === true, {
    message: 'You must agree not to bring prohibited items to continue.',
  }),
});


export type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { data: session,status } = useSession();
  // Use session.user directly, with fallback to undefined if not available
  const currentUser: User | undefined = session?.user;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const cities = ['Bogota', 'Medellin', 'Valencia', 'Londres', 'Bilbao'];
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name:  currentUser?.name || '',
      email: currentUser?.email || '',
      companyName: '',
      role:  '',
      city: ''
    
    },
  });
  useEffect(() => {
    if (status === 'authenticated' && currentUser) {
      form.reset({
        name: currentUser.name || '',
        email: currentUser.email || '',
        companyName: '',
        role: '',
        city: '',
      });
    }
  }, [status, currentUser, form]);

  const progressPosition = () => {
    switch (step) {
      case 1:
        return 'left-0';
      case 2:
        return 'left-1/2 transform -translate-x-1/2';
      case 3:
        return 'right-0';
      default:
        return 'left-0';
    }
  };



  const handleStepChange = (newStep: number) => {
   
    if (newStep >= 1 && newStep <= 3) {
      setStep(newStep); 
   
    }
  };

  const handleNextClick = () => {
    if (step < 3) {
      setStep(step + 1); 
   
    }
    form.handleSubmit; 
  };
  const handlePreviousClick=()=>{
    if (step > 1) {
      setStep(step - 1);
      
    }
  }

  const handleSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
  
    if (step < 3) {
      setStep(step + 1);
    } else {
   //send data
    }
  };

  const onSaveLater = () => {
    //save data in local Storage
  };



  return (
    <div className='w-full items-center justify-center '>
      <h2 className='text-2xl font-bold mb-6 text-foreground'>
        Builders Hub - Registration Page (Step {step}/3)
      </h2>
      {/* progress bar */}
      <div className='relative w-full h-1 bg-zinc-300 dark:bg-zinc-900 mb-4'>
        <div
          className={`absolute h-full bg-zinc-800  dark:bg-zinc-300 ${progressPosition()} w-1/3 transition-all duration-300`}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-6'
        >
          <div>
          {step === 1 && <RegisterFormStep1 cities={cities} user={session?.user}/>}
          {step === 2 && <RegisterFormStep2 />}
          {step === 3 && <RegisterFormStep3 />}
          </div>
          <div className="w-full h-px bg-zinc-300 mt-4"/>{""} 
          <Separator className='border-red-300 dark:border-red-300'/>
          

          <div className=' mt-8 gap-[10px] pt-8  flex justify-between items-center pl-0 '>
            <div className='flex gap-x-4'>
              <Button
                variant='outline'
                type='submit'
                className={cn(
                  step === 3 ? 'block' : 'hidden',
                  'bg-red-500 hover:bg-red-600'
                )}
              >
                Save & Exit
              </Button>
              <Button
                variant='outline'
                type='submit'
                onClick={handleSubmit}
                className={cn(
                  step != 3 ? 'block' : 'hidden',
                  'bg-red-500 hover:bg-red-600'
                )}
              >
                
                Continue
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={onSaveLater}
                className={cn(
                  step != 3 ? 'block' : 'hidden',
                  'bg-white text-black border border-gray-300 hover:text-black hover:bg-gray-100'
                )}
              >
                Save & Continue Later
              </Button>
            </div>
            <div className='flex items-center space-x-1 '>
              <PaginationPrevious
                className={cn(
                  step > 1 ? 'flex' : 'hidden',
                  ' Dark:hover:text-gray-200 cursor-pointer '
                )}
                onClick={handlePreviousClick}
                hidden={step < 2}
              />
              <Pagination>
                <PaginationContent>
                  {Array.from({ length: 3 }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={step === page}
                        className='cursor-pointer'
                        onClick={() => handleStepChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
              </Pagination>
              <PaginationNext
                className={cn(
                  step < 3 ? 'flex' : 'hidden',
                  ' Dark:hover:text-gray-200 cursor-pointer'
                )}
                onClick={handleNextClick}
                hidden={step == 3}
              />
              <span className=' font-Aeonik font-normal text-sm leading-[16.8px] tracking-normal w-full'>
                Step {step} of 3
              </span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}