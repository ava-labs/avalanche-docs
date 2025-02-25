import { signIn } from 'next-auth/react';
import React from 'react'
import Image from 'next/image';
function SocialMediaLoginButtons() {
     async function SignInGoogle() {
        await signIn('google', { callbackUrl: `/` });
      }
  return (
    <div>
      <div className="flex items-center justify-center  w-full max-w-[25rem] my-4">
        <hr className="flex-grow border-t border-zinc-800" />
        <span className="px-4 text-zinc-400 text-sm font-medium">
          SIGN IN WITH
        </span>
        <hr className="flex-grow border-t border-zinc-800" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          onClick={SignInGoogle}
        >
          <Image
            src="/images/googleLogo.svg"
            alt="googleLogo"
            width={24}
            height={16}
          ></Image>
          <span className="text-sm font-medium">Google</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition">
          <Image
            src="/images/githubLogo.svg"
            alt="googleLogo"
            width={24}
            height={16}
          ></Image>
          <span className="text-sm font-medium">Github</span>
        </button>
      </div>
    </div>
  );
}

export default SocialMediaLoginButtons
