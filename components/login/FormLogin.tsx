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
import { Button } from "@/components/ui/button"
import SocialMediaLoginButtons from './sections/social-media-login-buttons';
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  items-center">
        <div className="hidden lg:flex pt-14 pb-14 justify-center items-center bg-zinc-900">
          <Image
            src={"/images/avalancheLoginLogo.svg"}
            alt={"logo_avalanche "}
            width={559.5}
            height={685.81}
          ></Image>
        </div>

        <div className='justify-between p-10'>
          <div className='py-2 px-4 gap-3'>
            <Link
              href="#"
         
              className="absolute top-5 lg:top-[9rem] right-0 left-0 lg:right-24  w-full lg:w-auto text-center lg:text-right lg:bg-transparent text-white lg:text-zinc-400 underline hover:text-gray-300 py-2 lg:py-0 px-4 lg:px-0 font-medium z-50"
            >
              Sign Up
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center   gap-2">
            <div className="text-center ">
              <h3 className="font-medium text-2xl">Sign in to your account</h3>
              <p className="text-zinc-400 text-sm pt-2">
                Sign up with email or choose another method.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center space-y-6 w-full mt-6 max-w-[350px]">
              <Form {...formMethods}>
                <form method="post" className="space-y-6 w-full">
                  <div className="space-y-2">
                    <FormField
                      control={formMethods.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="bg-transparent w-full"
                              placeholder="name@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formMethods.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              className="bg-transparent w-full"
                              placeholder="password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-zinc-400">
                            At least 8 characters, 1 number & 1 symbol
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full bg-red-500 p-2 rounded"
                  >
                    SIGN IN
                  </Button>
                </form>
              </Form>

              <Link href="#" className="text-zinc-400 text-sm text-center">
                Forgot password?
              </Link>

       

              <SocialMediaLoginButtons></SocialMediaLoginButtons>

              <footer className="pt-10">
              <p className="text-zinc-400 items-center justify-center w-full max-w-[400px] text-center text-sm font-medium">
                By clicking continue, you agree to our{" "}
                <Link
                  href="#"
                  className="underline text-white hover:text-gray-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="underline text-white hover:text-gray-300"
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
    </main>
  );
}

export default Formlogin;
