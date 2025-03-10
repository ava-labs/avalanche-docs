import FormLoginWrapper from '@/components/login/FormLoginWrapper';

export default function LoginPage(): React.ReactElement {
  return (
    <main className='min-h-[calc(100vh-92px)] lg:min-h-0 flex items-center justify-center  container relative px-2 pb-6 lg:px-14 '>
      <div className='border  shadow-sm  rounded-md'>
        <FormLoginWrapper />
      </div>
    </main>
  );
}
