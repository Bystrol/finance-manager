'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  children: ReactNode;
}

const SessionContext = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionContext;
