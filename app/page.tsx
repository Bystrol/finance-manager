"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/auth");
  }

  if (session && status === "authenticated") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-4xl font-bold">
        <p>Hello, {session?.user?.name}!</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-4xl font-bold">
      <p>Authenticating user...</p>
    </main>
  );
};

export default Home;
