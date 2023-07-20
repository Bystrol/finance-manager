"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}

const SessionContext = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionContext;
