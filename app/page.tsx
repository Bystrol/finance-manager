"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Triangle } from "react-loader-spinner";

const Home = () => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/auth");
  }

  if (status === "authenticated") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-4xl font-bold"></main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-4xl font-bold">
      <Triangle width={100} height={100} wrapperClass="absolute" color="#fff" />
    </main>
  );
};

export default Home;
