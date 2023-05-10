"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex bg-white w-[50%] h-[60vh] rounded-xl p-4">
        <div className="flex flex-col items-center justify-center w-[50%] h-full text-center gap-3 relative">
          <div className="font-bold text-2xl absolute top-0 left-0 italic drop-shadow-md flex">
            <RiMoneyDollarCircleFill className="mr-2" size={30} />
            <h1>FINEances</h1>
          </div>
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

          <button className="w-64 rounded-lg h-[4vh] text-sm text-white bg-zinc-900 hover:bg-zinc-700">
            Log in
          </button>
          <p className="text-xs">OR</p>
          <Button icon={FcGoogle} text="Continue with Google" />
          <Button icon={AiOutlineGithub} text="Continue with GitHub" />
        </div>
        <div className="w-[50%] h-full bg-[url('/images/auth-image.jpg')] bg-no-repeat bg-center bg-cover rounded-lg shadow-md"></div>
      </div>
    </div>
  );
};

export default Auth;
