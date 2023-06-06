"use client";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import React, { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
        });
      } catch (error) {
        console.log(error);
      }
    },
    [email, password]
  );

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await axios.post("/api/register", { email, username, password });
        handleLogin(e);
      } catch (error) {
        console.log(error);
      }
    },
    [email, username, password, handleLogin]
  );

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex bg-white w-[50%] h-[70vh] rounded-xl p-4">
        <form
          onSubmit={variant === "login" ? handleLogin : handleRegister}
          className="flex flex-col items-center justify-center w-[50%] h-full text-center gap-3 relative"
        >
          <div className="font-bold text-2xl absolute top-0 left-0 italic drop-shadow-md flex">
            <RiMoneyDollarCircleFill className="mr-2" size={30} />
            <h1>FINEances</h1>
          </div>
          <h1 className="font-bold text-2xl">
            {variant === "login" ? "Welcome back!" : "First time here?"}
          </h1>
          <h2 className=" text-sm text-zinc-600 mb-5">
            Please enter your details.
          </h2>
          {variant === "register" && (
            <Input
              id="username"
              type="username"
              onChange={(e: any) => setUsername(e.target.value)}
              value={username}
              label="Enter your username"
            />
          )}
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
            {variant === "login" ? "Log in" : "Register"}
          </button>
          <p className="text-xs">OR</p>
          <Button
            icon={FcGoogle}
            text="Continue with Google"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          />
          <Button
            icon={AiOutlineGithub}
            text="Continue with GitHub"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          />
          <p className="text-sm mt-4">
            {variant === "login" ? "Don't" : "Already"} have an account?
            <span
              onClick={toggleVariant}
              className="hover:underline cursor-pointer font-bold ml-1"
            >
              {variant === "login" ? "Register" : "Log in"}
            </span>
          </p>
        </form>
        <div className="w-[50%] h-full bg-[url('/images/auth-image.jpg')] bg-no-repeat bg-center bg-cover rounded-lg shadow-md"></div>
      </div>
    </div>
  );
};

export default Auth;
