'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { isValidEmail } from '@/lib/form/isValidEmail';
import { isValidPassword } from '@/lib/form/isValidPassword';
import {
  LoginFormData,
  LoginUpdatedError,
  LoginUpdatedTouched,
} from '@/interfaces/form_interfaces';
import LoginPage from '@/components/Auth/LoginPage';

const SignIn: React.FC = () => {
  const initialFormData = useMemo(
    () => ({
      email: '',
      password: '',
      isError: {
        email: false,
        password: false,
      },
      inputTouched: {
        email: false,
        password: false,
      },
    }),
    [],
  );

  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm: () => Promise<boolean> = useCallback(async () => {
    let isValid: boolean = true;

    await setFormData((prevFormData) => {
      const updatedError: LoginUpdatedError = {
        email: prevFormData.isError.email,
        password: prevFormData.isError.password,
      };

      const updatedTouched: LoginUpdatedTouched = {
        email: true,
        password: true,
      };

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
  }, [formData.email, formData.password]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center bg-white w-full lg:w-3/5 h-full lg:h-4/5 p-4 lg:rounded-xl">
        <div className="font-bold text-2xl lg:text-xl italic drop-shadow-md flex self-start">
          <RiMoneyDollarCircleFill className="mr-2" size={30} />
          <h1>FINEances</h1>
        </div>
        <div className="flex w-full h-full justify-center my-8">
          <section className="flex justify-center w-8/12 lg:w-1/2">
            <LoginPage
              validateForm={validateForm}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              formData={formData}
              setFormData={setFormData}
            />
          </section>
          <div className="hidden lg:block w-[50%] bg-[url('/images/auth-image.jpg')] bg-no-repeat bg-center bg-cover rounded-lg shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
