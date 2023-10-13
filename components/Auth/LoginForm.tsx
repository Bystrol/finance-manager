'use client';

import { FormEvent, MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { handleInputEvent } from '@/lib/form/handleInputEvent';
import { ColorRing } from 'react-loader-spinner';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import useFormData from '@/hooks/useFormData';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<{
    [key: string]: boolean;
    visitorButton: boolean;
    mainButton: boolean;
  }>({
    visitorButton: false,
    mainButton: false,
  });
  const router = useRouter();
  const { loginFormData, setLoginFormData, validateLoginForm } = useFormData();

  const handleLogin = async (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
    buttonType: string,
    email: string,
    password: string,
  ) => {
    e.preventDefault();
    if (
      (buttonType === 'mainButton' && (await validateLoginForm())) ||
      buttonType === 'visitorButton'
    ) {
      setIsLoading({
        ...isLoading,
        [buttonType]: true,
      });
      signIn('credentials', {
        email,
        password,
        redirect: false,
      }).then((callback) => {
        setIsLoading({
          ...isLoading,
          mainButton: false,
        });
        if (callback?.error) {
          toast.error(callback.error);
        } else if (callback?.ok && !callback.error) {
          setTimeout(() => toast.success('Logged in successfully!'), 1000);
        }
      });
    }
  };

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        handleLogin(
          e,
          'mainButton',
          loginFormData.email,
          loginFormData.password,
        )
      }
      className="flex flex-col items-center justify-center w-full lg:w-8/12 h-full text-center gap-3 relative"
    >
      <h1 className="font-bold text-2xl md:text-4xl lg:text-xl">
        Welcome back!
      </h1>
      <h2 className=" text-md md:text-xl lg:text-sm text-zinc-600 mb-5">
        Please enter your details.
      </h2>
      <Input
        id="email"
        type="text"
        label="Enter your email *"
        value={loginFormData.email}
        onChange={(event) => handleInputEvent(event, setLoginFormData)}
        onBlur={(event) => handleInputEvent(event, setLoginFormData)}
        isError={loginFormData.isError.email}
        errorMessage={
          loginFormData.email.length !== 0
            ? 'Invalid email format (e.g. email@example.com)'
            : 'Please enter your email'
        }
      />
      <Input
        id="password"
        type="password"
        label="Enter your password *"
        value={loginFormData.password}
        onChange={(event) => handleInputEvent(event, setLoginFormData)}
        onBlur={(event) => handleInputEvent(event, setLoginFormData)}
        isError={loginFormData.isError.password}
        errorMessage={
          loginFormData.password.length !== 0
            ? 'Password must consist of minimum 8 characters, at least one uppercase letter, one lowercase letter and one number'
            : 'Please enter your password'
        }
      />
      <button
        type="button"
        onClick={(e: MouseEvent<HTMLButtonElement>) =>
          handleLogin(e, 'visitorButton', 'test@gmail.com', 'Password1')
        }
        className="flex justify-center items-center w-full py-2 h-10 lg:h-11 md:h-14 rounded-lg text-sm md:text-xl lg:text-base font-bold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:shadow-md"
      >
        {isLoading.visitorButton ? (
          <ColorRing
            width={50}
            height={50}
            wrapperClass="absolute"
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />
        ) : (
          'Log in button for visitors'
        )}
      </button>
      <button className="flex justify-center items-center w-full py-2 h-10 lg:h-11 md:h-14 rounded-lg text-sm md:text-xl lg:text-base font-bold text-white bg-zinc-900 hover:bg-zinc-700">
        {isLoading.mainButton ? (
          <ColorRing
            width={50}
            height={50}
            wrapperClass="absolute"
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />
        ) : (
          'Log in'
        )}
      </button>
      <div className="flex justify-center relative w-full">
        <hr className="absolute top-[50%] w-9/12 lg:w-2/3 bg-zinc-400" />
        <p className="text-xs md:text-lg lg:text-xs w-8 z-20 bg-white">OR</p>
      </div>
      <Button
        icon={FcGoogle}
        text="Continue with Google"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      />
      <Button
        icon={AiOutlineGithub}
        text="Continue with GitHub"
        onClick={() => signIn('github', { callbackUrl: '/' })}
      />
      <p className="text-md md:text-xl lg:text-sm mt-4">
        Don&apos;t have an account?
        <span
          onClick={() => router.push('/auth/sign-up')}
          className="hover:underline cursor-pointer font-bold ml-1"
        >
          Register
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
