
import RegistrationFormWrapped from "@/components/hackathons/registration-form/RegistrationFormWrapped";
import { getSession } from "next-auth/react";

export default async function RegisterPage() {
  const algo =await getSession();
  console.log("desde register")
  console.log(algo)

  return (
    <main className='container relative max-w-[1400px] rounded-md border border-zinc-800 p-14 mt-8 '>
      <RegistrationFormWrapped  />
    </main>
  );
}