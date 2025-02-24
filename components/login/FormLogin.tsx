'use client';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleLogo } from './google-logo';
import { AvalancheLoginLogo } from './AvalancheLoginLogo';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
export const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

function Formlogin() {
  const formMethods = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function SignInGoogle() {
    await signIn('google', { callbackUrl: `/` });
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4  items-center'>
        <a
          href='#'
          className='absolute right-20 text-sm text-zinc-400 underline hover:text-gray-300'
          style={{ top: '7rem' }}
        >
          Sign Up
        </a>
        <div className='hidden md:flex  h-full justify-center bg-zinc-900'>
          <AvalancheLoginLogo className='w-full max-w-[28rem] text-white'></AvalancheLoginLogo>
        </div>

        <div className='flex flex-col justify-center items-center p-10 '>
          <div className='text-center '>
            <h3 className='font-medium text-2xl'>Sign in to your account</h3>
            <p className='text-zinc-400 text-sm pt-2'>
              Sign up with email or choose another method.
            </p>
          </div>

          <div className='flex flex-col justify-center items-center space-y-6 w-full mt-6 max-w-[350px]'>
            <Form {...formMethods}>
              <form method='post' className='space-y-6 w-full'>
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
                            value={field?.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formMethods.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type='password'
                            className='bg-transparent w-full'
                            placeholder='password'
                            {...field}
                            value={field?.value ?? ''}
                          />
                        </FormControl>
                        <FormDescription className='text-zinc-400'>
                          At least 8 characters, 1 number & 1 symbol
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <button
                  type='submit'
                  className='w-full bg-red-500 text-white p-2 rounded'
                >
                  SIGN IN
                </button>
              </form>
            </Form>

            <Link href='#' className='text-zinc-400 text-sm text-center'>
              Forgot password?
            </Link>

            <div className='flex items-center justify-center  w-full max-w-[25rem] my-4'>
              <hr className='flex-grow border-t border-zinc-800' />
              <span className='px-4 text-zinc-400 text-sm font-medium'>
                SIGN IN WITH
              </span>
              <hr className='flex-grow border-t border-zinc-800' />
            </div>

            <div className='flex items-center justify-center gap-4'>
              <button
                className='flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition'
                onClick={SignInGoogle}
              >
                <GoogleLogo fill='currentColor' />
              </button>

              <button className='flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1em'
                  height='1em'
                  viewBox='0 0 256 256'
                >
                  <g fill='none'>
                    <rect width='256' height='256' rx='60'></rect>
                    <path
                      fill='white'
                      d='M128.001 30C72.779 30 28 74.77 28 130.001c0 44.183 28.653 81.667 68.387 94.89c4.997.926 6.832-2.169 6.832-4.81c0-2.385-.093-10.262-.136-18.618c-27.82 6.049-33.69-11.799-33.69-11.799c-4.55-11.559-11.104-14.632-11.104-14.632c-9.073-6.207.684-6.079.684-6.079c10.042.705 15.33 10.305 15.33 10.305c8.919 15.288 23.394 10.868 29.1 8.313c.898-6.464 3.489-10.875 6.349-13.372c-22.211-2.529-45.56-11.104-45.56-49.421c0-10.918 3.906-19.839 10.303-26.842c-1.039-2.519-4.462-12.69.968-26.464c0 0 8.398-2.687 27.508 10.25c7.977-2.215 16.531-3.326 25.03-3.364c8.498.038 17.06 1.149 25.051 3.365c19.087-12.939 27.473-10.25 27.473-10.25c5.443 13.773 2.019 23.945.98 26.463c6.412 7.003 10.292 15.924 10.292 26.842c0 38.409-23.394 46.866-45.662 49.341c3.587 3.104 6.783 9.189 6.783 18.519c0 13.38-.116 24.149-.116 27.443c0 2.661 1.8 5.779 6.869 4.797C199.383 211.64 228 174.169 228 130.001C228 74.771 183.227 30 128.001 30M65.454 172.453c-.22.497-1.002.646-1.714.305c-.726-.326-1.133-1.004-.898-1.502c.215-.512.999-.654 1.722-.311c.727.326 1.141 1.01.89 1.508m4.919 4.389c-.477.443-1.41.237-2.042-.462c-.654-.697-.777-1.629-.293-2.078c.491-.442 1.396-.235 2.051.462c.654.706.782 1.631.284 2.078m3.374 5.616c-.613.426-1.615.027-2.234-.863c-.613-.889-.613-1.955.013-2.383c.621-.427 1.608-.043 2.236.84c.611.904.611 1.971-.015 2.406m5.707 6.504c-.548.604-1.715.442-2.57-.383c-.874-.806-1.118-1.95-.568-2.555c.555-.606 1.729-.435 2.59.383c.868.804 1.133 1.957.548 2.555m7.376 2.195c-.242.784-1.366 1.14-2.499.807c-1.13-.343-1.871-1.26-1.642-2.052c.235-.788 1.364-1.159 2.505-.803c1.13.341 1.871 1.252 1.636 2.048m8.394.932c.028.824-.932 1.508-2.121 1.523c-1.196.027-2.163-.641-2.176-1.452c0-.833.939-1.51 2.134-1.53c1.19-.023 2.163.639 2.163 1.459m8.246-.316c.143.804-.683 1.631-1.864 1.851c-1.161.212-2.236-.285-2.383-1.083c-.144-.825.697-1.651 1.856-1.865c1.183-.205 2.241.279 2.391 1.097'
                    ></path>
                  </g>
                </svg>
                <span className='text-sm font-medium'>Github</span>
              </button>
            </div>
          </div>
          <footer className='pt-10'>
            <p className='text-zinc-400 items-center justify-center w-full max-w-[400px] text-center text-sm font-medium'>
              By clicking continue, you agree to our{' '}
              <a
                href='/terms'
                className='underline text-white hover:text-gray-300'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline text-white hover:text-gray-300'
              >
                Privacy Policy
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Formlogin;
