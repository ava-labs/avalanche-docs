import { RegisterForm } from "@/components/hackathons/registration-form/registrationForm";

export default function RegisterPage() {
  return (
    <main className='container relative max-w-[1400px] rounded-md border border-zinc-800 p-14 mt-8 '>
      <RegisterForm  />
    </main>
  );
}