'use client';

import Link from 'next/link';
import Image from 'next/image';

import SocialLogin from './social-login/SocialLogin';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

function Formlogin() {
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4  items-center'>
        <div className='hidden lg:block p-10 w-full h-full bg-zinc-900'>
          <Image
            src='/hackaton-platform-images/avalancheLoginLogo.svg'
            alt='logo_avalanche '
            width='560'
            height='685'
          />
        </div>

        <div className='justify-between p-10 bg-zinc-950'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='text-center '>
              <h3 className='font-medium text-2xl'>Sign in to your account</h3>
              <p className='text-zinc-400 text-sm pt-2'>
                Enter your email to receive a sign-in code
              </p>
            </div>

            <div className='flex flex-col justify-center items-center space-y-6 w-full mt-6 max-w-[350px]'>
              <div className='w-full'>
                <Form {...formMethods}>
                  <form onSubmit={formMethods.handleSubmit(onSubmit)} className='space-y-6 w-full'>
                    <div className='space-y-2'>
                      <FormField
                        control={formMethods.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className='bg-transparent w-full'
                                placeholder='name@example.com'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type='submit'
                      variant='destructive'
                      className='w-full bg-red-500 p-2 rounded'
                    >
                      SEND VERIFICATION CODE
                    </Button>
                  </form>
                </Form>
              </div>
              <SocialLogin />
              <div>
                <footer className='pt-10'>
                  <p className='text-zinc-400 items-center justify-center w-full max-w-[400px] text-center text-sm font-medium'>
                    By clicking continue, you agree to our{' '}
                    <Link
                      href='#'
                      target='_blank'
                      className='underline text-white hover:text-gray-300'
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      href='#'
                      target='_blank'
                      className='underline text-white hover:text-gray-300'
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Formlogin;
