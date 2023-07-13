"use client";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import React, { useState, useCallback, useMemo } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import { setDataAttribute } from "@/app/utils/setDataAttribute";
import { isValidEmail } from "@/app/utils/isValidEmail";
import { isValidPassword } from "@/app/utils/isValidPassword";

const Auth: React.FC = () => {
  interface FormData {
    username: string;
    email: string;
    password: string;
    variant: string;
    isError: {
      username: boolean;
      email: boolean;
      password: boolean;
    };
    inputTouched: {
      [key: string]: boolean;
      username: boolean;
      email: boolean;
      password: boolean;
    };
  }

  interface UpdatedError {
    [key: string]: boolean;
    username: boolean;
    email: boolean;
    password: boolean;
  }

  const initialFormData = useMemo(
    () => ({
      username: "",
      email: "",
      password: "",
      variant: "login",
      isError: {
        username: false,
        email: false,
        password: false,
      },
      inputTouched: {
        username: false,
        email: false,
        password: false,
      },
    }),
    []
  );

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/");
  }

  const toggleVariant = useCallback(() => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        variant: prevFormData.variant === "login" ? "register" : "login",
      };
    });
  }, []);

  const validateForm = useCallback(async () => {
    let isValid: boolean = true;

    await setFormData((prevFormData) => {
      const updatedError: UpdatedError = {
        username: prevFormData.isError.username,
        email: prevFormData.isError.email,
        password: prevFormData.isError.password,
      };

      const updatedTouched = {
        username: true,
        email: true,
        password: true,
      };

      if (formData.variant === "register") {
        if (formData.username.length < 3) {
          updatedError.username = true;
          isValid = false;
        }
      }
      if (!isValidEmail(formData.email)) {
        updatedError.email = true;
        isValid = false;
      }
      if (!isValidPassword(formData.password)) {
        updatedError.password = true;
        isValid = false;
      }

      return {
        ...prevFormData,
        isError: updatedError,
        inputTouched: updatedTouched,
      };
    });

    return isValid;
  }, [formData.username, formData.email, formData.password, formData.variant]);

  const resetInputs = useCallback(() => {
    setFormData(initialFormData);
    document.getElementById("username")!.removeAttribute("data-input-active");
    document.getElementById("email")!.removeAttribute("data-input-active");
    document.getElementById("password")!.removeAttribute("data-input-active");
  }, [initialFormData]);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (await validateForm()) {
        setIsLoading(true);
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        }).then((callback) => {
          setIsLoading(false);
          if (callback?.error) {
            toast.error(callback.error);
          } else if (callback?.ok && !callback.error) {
            toast.success("Logged in successfully!");
          }
        });
      }
    },
    [formData.email, formData.password, validateForm]
  );

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (await validateForm()) {
        setIsLoading(true);
        try {
          await axios
            .post("/api/register", {
              email: formData.email,
              username: formData.username,
              password: formData.password,
            })
            .then(() => {
              setIsLoading(false);
              toast.success("User has been registered!");
              resetInputs();
            });
        } catch (error) {
          setIsLoading(false);
          toast.error(Object(error).response.data);
        }
      }
    },
    [
      formData.email,
      formData.username,
      formData.password,
      validateForm,
      resetInputs,
    ]
  );

  const handleInputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => {
      const updatedError: UpdatedError = {
        username: prevFormData.isError.username,
        email: prevFormData.isError.email,
        password: prevFormData.isError.password,
      };

      if (id === `${id}`) {
        switch (event.type) {
          case "focus":
            updatedError[id] = false;
            break;
          case "change":
            updatedError[id] =
              value.length === 0 && prevFormData.inputTouched[id];
            break;
          case "blur":
            updatedError[id] = !validateInput(id, value);
            break;
          default:
            updatedError[id] = false;
        }
      }

      setDataAttribute(event);

      return {
        ...prevFormData,
        [id]: value,
        inputTouched: {
          ...prevFormData.inputTouched,
          [id]: event.type === "blur" ? true : prevFormData.inputTouched[id],
        },
        isError: updatedError,
      };
    });
  };

  const validateInput = useCallback((id: string, value: string) => {
    if (id === "username") {
      return value.length >= 3;
    } else if (id === "email") {
      return isValidEmail(value);
    } else if ((id = "password")) {
      return isValidPassword(value);
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center bg-white w-full lg:w-3/5 h-full lg:h-4/5 p-4 lg:rounded-xl">
        <div className="font-bold text-2xl lg:text-xl italic drop-shadow-md flex self-start">
          <RiMoneyDollarCircleFill className="mr-2" size={30} />
          <h1>FINEances</h1>
        </div>
        <div className="flex w-full h-full justify-center">
          <section className="flex justify-center w-8/12 lg:w-1/2">
            <form
              onSubmit={
                formData.variant === "login" ? handleLogin : handleRegister
              }
              className="flex flex-col items-center justify-center w-full lg:w-8/12 h-full text-center gap-3 relative"
            >
              <h1 className="font-bold text-2xl md:text-4xl lg:text-xl">
                {formData.variant === "login"
                  ? "Welcome back!"
                  : "First time here?"}
              </h1>
              <h2 className=" text-md md:text-xl lg:text-sm text-zinc-600 mb-5">
                Please enter your details.
              </h2>
              {formData.variant === "register" && (
                <Input
                  id="username"
                  type="text"
                  label="Enter your username"
                  value={formData.username}
                  onChange={handleInputEvent}
                  onBlur={handleInputEvent}
                  onFocus={handleInputEvent}
                  isError={formData.isError.username}
                  errorMessage={"Username must consist of minimum 3 characters"}
                />
              )}
              <Input
                id="email"
                type="text"
                label="Enter your email"
                value={formData.email}
                onChange={handleInputEvent}
                onBlur={handleInputEvent}
                onFocus={handleInputEvent}
                isError={formData.isError.email}
                errorMessage={"Invalid email format (e.g. email@example.com)"}
              />
              <Input
                id="password"
                type="password"
                label="Enter your password"
                value={formData.password}
                onChange={handleInputEvent}
                onBlur={handleInputEvent}
                onFocus={handleInputEvent}
                isError={formData.isError.password}
                errorMessage={
                  "Password must consist of minimum 8 characters, at least one uppercase letter, one lowercase letter and one number"
                }
              />

              <button className="flex justify-center items-center w-full py-2 h-10 lg:h-11 md:h-14 rounded-lg text-sm md:text-xl lg:text-base font-bold text-white bg-zinc-900 hover:bg-zinc-700">
                {!isLoading &&
                  (formData.variant === "login" ? "Log in" : "Register")}
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
                <hr className="absolute top-[50%] w-9/12 lg:w-2/3 bg-zinc-400" />
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
                {formData.variant === "login" ? "Don't" : "Already"} have an
                account?
                <span
                  onClick={toggleVariant}
                  className="hover:underline cursor-pointer font-bold ml-1"
                >
                  {formData.variant === "login" ? "Register" : "Log in"}
                </span>
              </p>
            </form>
          </section>
          <div className="hidden lg:block w-[50%] h-full bg-[url('/images/auth-image.jpg')] bg-no-repeat bg-center bg-cover rounded-lg shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
