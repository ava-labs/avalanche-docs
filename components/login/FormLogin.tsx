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
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
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
    <main>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4  items-center'>
      <Link
      href="#"
      className="absolute top-5 lg:top-[7rem] right-0 left-0 lg:right-20  w-full lg:w-auto text-center lg:text-right lg:bg-transparent text-white lg:text-zinc-400 underline hover:text-gray-300 py-2 lg:py-0 px-4 lg:px-0 font-medium z-50"
    >
      Sign Up
    </Link>
 
        <div className='hidden lg:flex pt-14 pb-14 justify-center bg-zinc-900'>
      
          <Image src={"/images/avalancheLoginLogo.svg"} alt={"logo_avalanche "} width={559.5} height={685.81}></Image>
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
                <Image src="/images/googleLogo.svg" alt='googleLogo' width={24} height={16}></Image>
                <span className='text-sm font-medium'>Google</span>
              </button>

              <button className='flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition'>
              <Image src="/images/githubLogo.svg" alt='googleLogo' width={24} height={16}></Image>
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
    </main>
  );
}

export default Formlogin;
