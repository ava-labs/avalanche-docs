'use client';


import Link from 'next/link';
import Image from 'next/image';

import SocialMediaLoginButtons from './sections/social-media-login-buttons';
import { FooterLogin } from './sections/footer-login';
import { SignInInputs } from './sections/sing-in-inputs';


function Formlogin() {


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
    
              <SignInInputs></SignInInputs>
              <SocialMediaLoginButtons></SocialMediaLoginButtons>

              <FooterLogin></FooterLogin>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Formlogin;
