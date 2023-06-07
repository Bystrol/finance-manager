"use client";

import "./globals.css";
import Provider from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";

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
        <Provider>
          <ToasterContext />
          {children}
        </Provider>
      </body>
    </html>
  );
}
