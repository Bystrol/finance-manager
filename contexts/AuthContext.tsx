import { createContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Triangle } from "react-loader-spinner";

interface Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}

interface SessionContextProps {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated" | "error";
}

interface AuthContextProps {
  children: ReactNode;
}

export const SessionContext = createContext<SessionContextProps>({
  session: null,
  status: "loading",
});

export const AuthContext: React.FC<AuthContextProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated" | "error"
  >("loading");

  const { data: sessionData, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionData) {
      setSession(sessionData as Session);
      setStatus("authenticated");
    } else if (sessionStatus === "loading") {
      setStatus("loading");
    } else {
      setStatus("unauthenticated");
      if (window.location.pathname !== "/auth") {
        redirect("/auth");
      }
    }
  }, [sessionData, sessionStatus]);

  if (sessionStatus === "loading") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-4xl font-bold">
        <Triangle
          width={100}
          height={100}
          wrapperClass="absolute"
          color="#fff"
        />
      </main>
    );
  }

  return (
    <SessionContext.Provider value={{ session, status }}>
      {children}
    </SessionContext.Provider>
  );
};
