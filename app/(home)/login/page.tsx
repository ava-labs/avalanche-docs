import Formlogin from '@/components/login/FormLogin';

export default function LoginPage(): React.ReactElement {
  return (
    <main className='container relative  px-2 py-4 lg:p-14 '>
      <div className='border border-zinc-800 shadow-sm bg-zinc-950 rounded-md'>
        <Formlogin></Formlogin>
      </div>
    </main>
  );
}
