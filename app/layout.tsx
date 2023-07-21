'use client';

import './globals.css';
import NextSessionProvider from '@/providers/NextSessionProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import { AuthProvider } from '@/providers/AuthProvider';

export const metadata = {
  title: 'FINEances',
  description: 'Application for managing your personal finances.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NextSessionProvider>
          <AuthProvider>
            <ToasterProvider />
            {children}
          </AuthProvider>
        </NextSessionProvider>
      </body>
    </html>
  );
}
