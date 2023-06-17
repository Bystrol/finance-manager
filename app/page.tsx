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
      <main className="flex min-h-screen flex-col items-center justify-between">
        <p>Hello, {session?.user?.name}!</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <p>Loading user...</p>
    </main>
  );
};

export default Home;
