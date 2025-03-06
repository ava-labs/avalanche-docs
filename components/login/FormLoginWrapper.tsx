'use client'
import { SessionProvider } from 'next-auth/react';
import Formlogin from './FormLogin';

export default function FormLoginWrapper() {
  return (
    <SessionProvider>
      <Formlogin />
    </SessionProvider>
  );
}