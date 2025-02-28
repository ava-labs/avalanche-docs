import { signIn } from 'next-auth/react';
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
function SocialMediaLoginButtons() {
     async function SignInGoogle(provider:'google' | 'github' | 'twitter') {
        await signIn(provider, { callbackUrl: `/` });
      }
  return (
    <div>
      <div className="flex items-center justify-center  w-full my-4">
      <Separator className="flex-1 bg-zinc-800" />
  <span className="px-4 text-zinc-400 text-sm font-medium whitespace-nowrap md:px-6">
    SIGN IN WITH
  </span>
  <Separator className="flex-1 bg-zinc-800" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline"
          className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          onClick={()=>SignInGoogle('google')}
        >
          <Image
            src="/hackaton-platform-images/googleLogo.svg"
            alt="googleLogo"
            width={24}
            height={16}
          ></Image>
          <span className="text-sm font-medium">Google</span>
        </Button>

        <Button variant="outline" className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition"
           onClick={()=>SignInGoogle('github')}
        >
          <Image
            src="/hackaton-platform-images/githubLogo.svg"
            alt="githubLogo"
            width={24}
            height={16}
          ></Image>
          <span className="text-sm font-medium">Github</span>
        </Button>

        <Button variant="outline"
          className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          onClick={()=>SignInGoogle('twitter')}
        >
          <Image
            src="/hackaton-platform-images/twitter_X_logo.svg"
            alt="googleLogo"
            width={24}
            height={16}
          ></Image>
          <span className="text-sm font-medium">X</span>
        </Button>
      </div>
    </div>
  );
}

export default SocialMediaLoginButtons
