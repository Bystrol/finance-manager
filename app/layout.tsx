"use client";

import "./globals.css";
import SessionContext from "@/contexts/SessionContext";
import ToasterContext from "@/contexts/ToasterContext";
import { AuthContext } from "@/contexts/AuthContext";

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
            {children}
          </AuthContext>
        </SessionContext>
      </body>
    </html>
  );
}
