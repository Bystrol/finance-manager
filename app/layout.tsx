'use client';

import './globals.css';
import NextSessionProvider from '@/providers/NextSessionProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '@/store/store';
import Loading from '@/features/loading/Loading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider store={store}>
          <NextSessionProvider>
            <AuthProvider>
              <ToasterProvider />
              {children}
              <Loading />
            </AuthProvider>
          </NextSessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
