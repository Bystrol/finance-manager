"use client";

import "./globals.css";
import SessionContext from "./contexts/SessionContext";
import ToasterContext from "./contexts/ToasterContext";
import { AuthContext } from "./contexts/AuthContext";
import Header from "./components/Header";

export const metadata = {
  title: "FINEances",
  description: "Application for managing your personal finances.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionContext>
          <AuthContext>
            <ToasterContext />
            <Header />
            {children}
          </AuthContext>
        </SessionContext>
      </body>
    </html>
  );
}
