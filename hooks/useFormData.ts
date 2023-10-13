import { useState } from 'react';
import {
  FormData,
  UpdatedError,
  UpdatedTouched,
} from '@/interfaces/form_interfaces';
import { isValidEmail } from '@/lib/form/isValidEmail';
import { isValidPassword } from '@/lib/form/isValidPassword';

const useFormData = () => {
  const initialLoginData: FormData = {
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
  };

  const initialRegisterData: FormData = {
    ...initialLoginData,
    username: '',
    isError: {
      ...initialLoginData.isError,
      username: false,
    },
    inputTouched: {
      ...initialLoginData.inputTouched,
      username: false,
    },
  };

  const [loginFormData, setLoginFormData] =
    useState<FormData>(initialLoginData);
  const [registerFormData, setRegisterFormData] =
    useState<FormData>(initialRegisterData);

  const validateLoginForm: () => Promise<boolean> = async () => {
    let isValid: boolean = true;

    await setLoginFormData((prevLoginFormData) => {
      const updatedError: UpdatedError = {
        email: prevLoginFormData.isError.email,
        password: prevLoginFormData.isError.password,
      };

      const updatedTouched: UpdatedTouched = {
        email: true,
        password: true,
      };

      if (!isValidEmail(loginFormData.email)) {
        updatedError.email = true;
        isValid = false;
      }
      if (!isValidPassword(loginFormData.password)) {
        updatedError.password = true;
        isValid = false;
      }

      return {
        ...prevLoginFormData,
        isError: updatedError,
        inputTouched: updatedTouched,
      };
    });

    return isValid;
  };

  const validateRegisterForm: () => Promise<boolean> = async () => {
    let isValid: boolean = true;

    await setRegisterFormData((prevRegisterFormData) => {
      const updatedError: UpdatedError = {
        username: prevRegisterFormData.isError.username,
        email: prevRegisterFormData.isError.email,
        password: prevRegisterFormData.isError.password,
      };

      const updatedTouched: UpdatedTouched = {
        username: true,
        email: true,
        password: true,
      };

      if (registerFormData.username!.length < 3) {
        updatedError.username = true;
        isValid = false;
      }

      if (!isValidEmail(registerFormData.email)) {
        updatedError.email = true;
        isValid = false;
      }
      if (!isValidPassword(registerFormData.password)) {
        updatedError.password = true;
        isValid = false;
      }

      return {
        ...prevRegisterFormData,
        isError: updatedError,
        inputTouched: updatedTouched,
      };
    });

    return isValid;
  };

  return {
    loginFormData,
    setLoginFormData,
    validateLoginForm,
    registerFormData,
    setRegisterFormData,
    validateRegisterForm,
  };
};

export default useFormData;
