"use client";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import React, { useState, useCallback, useEffect } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import { useSession } from "next-auth/react";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [logoSize, setLogoSize] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/");
  }

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
  }, [checkLogoSize]);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsLoading(true);
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);
        if (callback?.error) {
          toast.error(callback.error);
        } else if (callback?.ok && !callback.error) {
          toast.success("Logged in successfully!");
        }
      });
    },
    [email, password]
  );

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsLoading(true);
      try {
        await axios
          .post("/api/register", { email, username, password })
          .then(() => {
            setIsLoading(false);
            toast.success("User has been registered!");
            handleLogin(e);
          });
      } catch (error) {
        setIsLoading(false);
        toast.error(Object(error).response.data);
      }
    },
    [email, username, password, handleLogin]
  );

  const setDataAttribute = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        e.target.setAttribute("data-input-active", "");
      } else {
        e.target.removeAttribute("data-input-active");
      }
    },
    []
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
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value.replace(/\s+/g, ""));
                  setDataAttribute(e);
                }}
                value={username}
                label="Enter your username"
              />
            )}
            <Input
              id="email"
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setDataAttribute(e);
              }}
              value={email}
              label="Enter your email"
            />
            <Input
              id="password"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setDataAttribute(e);
              }}
              value={password}
              label="Enter your password"
            />

            <button className="flex justify-center items-center w-full lg:w-8/12 py-2 h-10 lg:h-11 md:h-14 rounded-lg text-sm md:text-xl lg:text-base font-bold text-white bg-zinc-900 hover:bg-zinc-700">
              {variant === "login" ? "Log in" : "Register"}
              {isLoading ? (
                <ColorRing
                  width={50}
                  height={50}
                  wrapperClass="absolute"
                  colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                />
              ) : (
                ""
              )}
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
