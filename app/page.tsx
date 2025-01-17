import { permanentRedirect } from 'next/navigation';

export default function Home() {
  permanentRedirect('https://build.avax.network/docs');
}