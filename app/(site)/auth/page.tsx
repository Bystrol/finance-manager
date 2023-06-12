"use client";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [logoSize, setLogoSize] = useState(30);

  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const checkLogoSize = useCallback(() => {
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      setLogoSize(45);
    } else {
      setLogoSize(30);
    }
  }, []);

  useEffect(() => {
    checkLogoSize();
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        } else if (callback?.ok && !callback.error) {
          toast.success("Logged in successfully!");
          router.push("/");
        }
      });
    },
    [email, password]
  );

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await axios
          .post("/api/register", { email, username, password })
          .then(() => toast.success("User has been registered!"));
        handleLogin(e);
      } catch (error) {
        toast.error(Object(error).response.data);
      }
    },
    [email, username, password, handleLogin]
  );

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center bg-white w-full lg:w-3/5 h-full lg:h-4/5 p-4 lg:rounded-xl">
        <div className="font-bold text-2xl md:text-4xl lg:text-xl italic drop-shadow-md flex self-start">
          <RiMoneyDollarCircleFill className="mr-2" size={logoSize} />
          <h1>FINEances</h1>
        </div>
        <div className="flex w-full h-full justify-center">
          <form
            onSubmit={variant === "login" ? handleLogin : handleRegister}
            className="flex flex-col items-center justify-center w-8/12 md:w-1/2 h-full text-center gap-3 relative"
          >
            <h1 className="font-bold text-2xl md:text-4xl lg:text-xl">
              {variant === "login" ? "Welcome back!" : "First time here?"}
            </h1>
            <h2 className=" text-md md:text-xl lg:text-sm text-zinc-600 mb-5">
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

            <button className="w-full lg:w-8/12 py-2 h-10 lg:h-11 md:h-14 rounded-lg text-sm md:text-xl lg:text-base font-bold text-white bg-zinc-900 hover:bg-zinc-700">
              {variant === "login" ? "Log in" : "Register"}
            </button>
            <div className="flex justify-center relative w-full">
              <hr className="absolute top-[50%] w-9/12 lg:w-1/2 bg-zinc-400" />
              <p className="text-xs md:text-lg lg:text-xs w-8 z-20 bg-white">
                OR
              </p>
            </div>
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
            <p className="text-md md:text-xl lg:text-sm mt-4">
              {variant === "login" ? "Don't" : "Already"} have an account?
              <span
                onClick={toggleVariant}
                className="hover:underline cursor-pointer font-bold ml-1"
              >
                {variant === "login" ? "Register" : "Log in"}
              </span>
            </p>
          </form>
          <div className="hidden lg:block w-[50%] h-full bg-[url('/images/auth-image.jpg')] bg-no-repeat bg-center bg-cover rounded-lg shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
