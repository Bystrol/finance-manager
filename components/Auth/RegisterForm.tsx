'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { handleInputEvent } from '@/lib/form/handleInputEvent';
import { ColorRing } from 'react-loader-spinner';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import useFormData from '@/hooks/useFormData';

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { registerFormData, setRegisterFormData, validateRegisterForm } =
    useFormData();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (await validateRegisterForm()) {
      setIsLoading(true);
      try {
        await axios
          .post('/api/register', {
            email: registerFormData.email,
            username: registerFormData.username,
            password: registerFormData.password,
          })
          .then(() => {
            setIsLoading(false);
            toast.success('User has been registered!');
            router.push('/auth/sign-in');
          });
      } catch (error) {
        setIsLoading(false);
        toast.error(Object(error).response.data);
      }
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col items-center justify-center w-full lg:w-8/12 h-full text-center gap-3 relative"
    >
      <h1 className="font-bold text-2xl md:text-4xl lg:text-xl">
        First time here?
      </h1>
      <h2 className=" text-md md:text-xl lg:text-sm text-zinc-600 mb-5">
        Please enter your details.
      </h2>
      <Input
        id="username"
        type="text"
        label="Enter your username *"
        value={registerFormData.username!}
        onChange={(event) => handleInputEvent(event, setRegisterFormData)}
        onBlur={(event) => handleInputEvent(event, setRegisterFormData)}
        isError={registerFormData.isError.username}
        errorMessage={
          registerFormData.username!.length !== 0
            ? 'Username must consist of minimum 3 characters'
            : 'Please enter your username'
        }
      />
      <Input
        id="email"
        type="text"
        label="Enter your email *"
        value={registerFormData.email}
        onChange={(event) => handleInputEvent(event, setRegisterFormData)}
        onBlur={(event) => handleInputEvent(event, setRegisterFormData)}
        isError={registerFormData.isError.email}
        errorMessage={
          registerFormData.email.length !== 0
            ? 'Invalid email format (e.g. email@example.com)'
            : 'Please enter your email'
        }
      />
      <Input
        id="password"
        type="password"
        label="Enter your password *"
        value={registerFormData.password}
        onChange={(event) => handleInputEvent(event, setRegisterFormData)}
        onBlur={(event) => handleInputEvent(event, setRegisterFormData)}
        isError={registerFormData.isError.password}
        errorMessage={
          registerFormData.password.length !== 0
            ? 'Password must consist of minimum 8 characters, at least one uppercase letter, one lowercase letter and one number'
            : 'Please enter your password'
        }
      />

      <button className="flex justify-center items-center w-full py-2 h-10 lg:h-11 md:h-14 rounded-lg text-sm md:text-xl lg:text-base font-bold text-white bg-zinc-900 hover:bg-zinc-700">
        {isLoading ? (
          <ColorRing
            width={50}
            height={50}
            wrapperClass="absolute"
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />
        ) : (
          'Register'
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
        Already have an account?
        <span
          onClick={() => router.push('/auth/sign-in')}
          className="hover:underline cursor-pointer font-bold ml-1"
        >
          Log in
        </span>
      </p>
    </form>
  );
};

export default RegisterPage;
