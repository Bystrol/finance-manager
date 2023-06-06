"use client";

import "./globals.css";
import Provider from "@/app/context/AuthContext";

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
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
