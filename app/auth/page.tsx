"use client";

import Input from "@/components/Input";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex bg-white w-[50%] h-[60vh] rounded-xl p-4">
        <div className="flex flex-col items-center justify-center w-[50%] h-full text-center gap-3">
          <h1 className="font-bold text-2xl">Welcome back!</h1>
          <h2 className=" text-sm text-zinc-600 mb-5">
            Please enter your details.
          </h2>
          <Input
            id="email"
            type="email"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
            label="Enter your email"
          />
          <Input
            id="password"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
            label="Enter your password"
          />
        </div>
        <div className="w-[50%] h-full bg-[url('/images/auth-image.jpg')] bg-no-repeat bg-center bg-cover rounded-lg"></div>
      </div>
    </div>
  );
};

export default Auth;
