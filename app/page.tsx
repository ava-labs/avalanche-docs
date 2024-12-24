import { permanentRedirect } from 'next/navigation';

export default function Home() {
  permanentRedirect('https://developers.avax.network/docs');
}