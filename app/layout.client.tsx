'use client';
import type { ReactNode } from 'react';
import { AvalancheLogo } from '@/components/navigation/avalanche-logo';



export function NavbarTitle(): React.ReactElement {
	return (
	  <div className='flex gap-2.5 shrink-0'>
		<AvalancheLogo />
		<span style={{ fontSize: "large" }}>Developer Hub</span>
	  </div>
	);
  }

export function Body({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
  <div>
    {children}
    </div>
);
}
