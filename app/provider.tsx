'use client';

import { RootProvider } from 'fumadocs-ui/provider';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  
  if (posthogKey) {
    const consent = localStorage.getItem('cookie_consent');
    posthog.init(posthogKey, {
      api_host: posthogHost || 'https://app.posthog.com',
      persistence: consent === 'yes' ? 'localStorage+cookie' : 'memory'
    });
  } else {
    console.warn('PostHog key not found in environment variables');
  }
}

const SearchDialog = dynamic(() => import('@/components/search'));

export function Provider({ children }: { children: ReactNode }) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return (
      <RootProvider
        search={{
          SearchDialog,
        }}
      >
        {children}
      </RootProvider>
    );
  }
  
  return (
    <PostHogProvider client={posthog}>
      <RootProvider
        search={{
          SearchDialog,
        }}
      >
        {children}
      </RootProvider>
    </PostHogProvider>
  );
}