"use client";

import React, { useState, useCallback, useMemo } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { isValidEmail } from "@/app/utils/isValidEmail";
import { isValidPassword } from "@/app/utils/isValidPassword";
import { FormData, UpdatedError } from "@/app/interfaces/form_interfaces";
import LoginPage from "@/app/components/Auth/LoginPage";
import RegisterPage from "@/app/components/Auth/RegisterPage";

const Auth: React.FC = () => {
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

  const validateForm: () => Promise<boolean> = useCallback(async () => {
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

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center bg-white w-full lg:w-3/5 h-full lg:h-4/5 p-4 lg:rounded-xl">
        <div className="font-bold text-2xl lg:text-xl italic drop-shadow-md flex self-start">
          <RiMoneyDollarCircleFill className="mr-2" size={30} />
          <h1>FINEances</h1>
        </div>
        <div className="flex w-full h-full justify-center my-8">
          <section className="flex justify-center w-8/12 lg:w-1/2">
            {formData.variant === "login" ? (
              <LoginPage
                validateForm={validateForm}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                formData={formData}
                setFormData={setFormData}
                toggleVariant={toggleVariant}
              />
            ) : (
              <RegisterPage
                validateForm={validateForm}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                formData={formData}
                setFormData={setFormData}
                toggleVariant={toggleVariant}
                resetInputs={resetInputs}
              />
            )}
          </section>
          <div className="hidden lg:block w-[50%] bg-[url('/images/auth-image.jpg')] bg-no-repeat bg-center bg-cover rounded-lg shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
