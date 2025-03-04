'use client';

import type { Session } from 'next-auth';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export function UserButton() {

  const { data: session, status } = useSession()

  const isAuthenticated = status === 'authenticated';

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='rounded-full'>
            {isAuthenticated && session?.user?.image ? (
              <Image
                src={session.user.image}
                alt='Foto de Perfil'
                width={28}
                height={28}
                className='rounded-full object-cover'
              />
            ) : (
              <User className='size-7' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-black border-zinc-600 text-white shadow-lg p-1 rounded-md w-48'>
          {isAuthenticated ? (
            <>
              <DropdownMenuItem>
                <Link href='/profile'>View Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center gap-2'>
                <Link href='/settings'>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center gap-2'>
                <Link href='/submissions'>My Submissions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Sign Out
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem>
              <Link href='/login'>Sign In</Link>
            </DropdownMenuItem>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
