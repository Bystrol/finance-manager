'use client';

import { useSession } from 'next-auth/react';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import Input from '@/components/UI/Input';
import blankPicture from '@/public/images/blank-profile-picture.png';
import { isValidEmail } from '@/lib/form/isValidEmail';
import { isValidPassword } from '@/lib/form/isValidPassword';
import { setDataAttribute } from '@/lib/form/setDataAttribute';
import { updateUserCredentials } from '@/lib/update/updateUserCredentials';
import { updateUserPicture } from '@/lib/update/updateUserPicture';
import styles from '@/styles/fileInput.module.css';
import { UpdatedError } from '@/interfaces/form_interfaces';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/features/loading/loadingSlice';

const Profile: React.FC = () => {
  const { data: session, update } = useSession();

  const dispatch = useDispatch();

  const email = session?.user?.email;

  interface FormData {
    username: string;
    email: string;
    oldPassword: string;
    password: string;
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
    isFormNotEmpty: boolean;
    [key: string]: string | boolean | { [key: string]: boolean };
  }

  const initialFormData = useMemo(
    () => ({
      username: '',
      email: '',
      oldPassword: '',
      password: '',
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
      isFormNotEmpty: false,
    }),
    [],
  );

  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => {
      const updatedError: UpdatedError = {
        username: prevFormData.isError.username,
        email: prevFormData.isError.email,
        password: prevFormData.isError.password,
      };

      let updatedFormNotEmpty = prevFormData.isFormNotEmpty;

      if (id === 'username') {
        updatedError.username =
          event.type === 'change'
            ? value.length < 3 && prevFormData.inputTouched.username
            : value.length < 3;
        updatedFormNotEmpty = value.length >= 3;
      } else if (id === 'email') {
        updatedError.email =
          event.type === 'change'
            ? !isValidEmail(value) && prevFormData.inputTouched.email
            : !isValidEmail(value);
        updatedFormNotEmpty = isValidEmail(value);
      } else if (id === 'password') {
        updatedError.password =
          event.type === 'change'
            ? !isValidPassword(value) && prevFormData.inputTouched.password
            : !isValidPassword(value);
        updatedFormNotEmpty =
          isValidPassword(value) && isValidPassword(formData.oldPassword);
      } else if (id === 'oldPassword') {
        updatedFormNotEmpty =
          isValidPassword(value) && isValidPassword(formData.password);
      }

      setDataAttribute(event);

      return {
        ...prevFormData,
        [id]: value,
        inputTouched: {
          ...prevFormData.inputTouched,
          [id]: event.type === 'blur' ? true : prevFormData.inputTouched[id],
        },
        isError: updatedError,
        isFormNotEmpty: updatedFormNotEmpty,
      };
    });
  };

  const toggleDropdown = () => {
    setShowDropdownMenu((state) => !state);
  };

  const resetInputs = useCallback(() => {
    setFormData(initialFormData);
    document.getElementById('username')!.removeAttribute('data-input-active');
    document.getElementById('email')!.removeAttribute('data-input-active');
    document
      .getElementById('oldPassword')!
      .removeAttribute('data-input-active');
    document.getElementById('password')!.removeAttribute('data-input-active');
  }, [initialFormData]);

  const convertToBase64 = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files![0]);
      reader.onload = async () => {
        dispatch(setLoading(true));
        const image = String(reader.result);
        await updateUserPicture(email!, image, () => {
          update({
            image,
          });
        }).then(() => {
          dispatch(setLoading(false));
        });
      };
      reader.onerror = (error) => {
        console.log(error);
      };
      toggleDropdown();
    },
    [email, update, dispatch],
  );

  const clickOutside = useCallback((e: MouseEvent) => {
    const targetNode = e.target as Node;
    if (dropdownRef.current && !dropdownRef.current.contains(targetNode)) {
      setShowDropdownMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', clickOutside);
  }, [clickOutside]);

  return (
    <div className="flex flex-col w-full items-center px-3">
      <div className="flex flex-col w-full max-w-7xl gap-2">
        <h1 className="text-xl font-medium">
          {session?.user?.name}&apos;s profile
        </h1>
        <hr className="bg-black/50" />
        <div className="flex flex-col lg:flex-row gap-y-7 lg:gap-x-10 w-full">
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-medium">Profile picture</h2>
            <div
              className="relative h-40 w-40 cursor-pointer rounded-[50%]"
              ref={dropdownRef}
            >
              <Image
                src={session?.user?.image || blankPicture}
                alt="profile_picture"
                fill
                onClick={toggleDropdown}
                className="rounded-[50%] border border-zinc-300 peer"
              />
              <button
                className="absolute bottom-0 right-0 p-1 m-2 flex items-center gap-x-1 bg-white hover:bg-zinc-100 rounded-md text-sm peer-hover:bg-zinc-100"
                onClick={toggleDropdown}
              >
                <FaRegEdit />
                <p className="pointer-events-none">Edit</p>
              </button>
              {showDropdownMenu && (
                <div className="dropdown-menu absolute -bottom-[78px] -right-2 flex flex-col justify-center bg-white w-[65px] rounded-md">
                  <input
                    accept="image/*"
                    type="file"
                    className={styles['file-input']}
                    onChange={convertToBase64}
                  />
                  <div
                    onClick={async () => {
                      dispatch(setLoading(true));
                      toggleDropdown();

                      await updateUserPicture(email!, '', () => {
                        update({
                          image: '',
                        });
                      }).then(() => {
                        dispatch(setLoading(false));
                      });
                    }}
                    className="rounded-b-md hover:bg-zinc-100"
                  >
                    <p className="text-sm p-2 pointer-events-none">Remove</p>
                  </div>
                </div>
              )}
            </div>
          </section>
          <form
            className="flex flex-col gap-y-6 lg:w-1/3"
            onSubmit={async (e: React.FormEvent) => {
              e.preventDefault();
              if (formData.isFormNotEmpty) {
                dispatch(setLoading(true));
                await updateUserCredentials(
                  email!,
                  formData.username,
                  formData.email,
                  formData.oldPassword,
                  formData.password,
                  () => {
                    update({
                      name: formData.username,
                      email: formData.email,
                    });
                  },
                ).then(() => {
                  dispatch(setLoading(false));
                  (document.activeElement as HTMLElement).blur();
                  resetInputs();
                });
              } else {
                toast.error('Form is incorrect');
              }
            }}
          >
            <section className="flex flex-col gap-2 lg:w-full h-full">
              <h2 className="text-sm font-medium">Username</h2>
              <p className="text-xs">Current username: {session?.user?.name}</p>
              <Input
                id="username"
                type="text"
                label="Enter new username"
                value={formData.username}
                onChange={handleInputEvent}
                onBlur={handleInputEvent}
                isError={formData.isError.username}
                errorMessage={
                  formData.username.length !== 0
                    ? 'Username must consist of minimum 3 characters'
                    : 'Please enter your username'
                }
              />
            </section>
            <section className="flex flex-col gap-2 lg:w-full h-full">
              <h2 className="text-sm font-medium">Email</h2>
              <p className="text-xs">Current email: {session?.user?.email}</p>
              <Input
                id="email"
                type="text"
                label="Enter new email"
                value={formData.email}
                onChange={handleInputEvent}
                onBlur={handleInputEvent}
                isError={formData.isError.email}
                errorMessage={
                  formData.email.length !== 0
                    ? 'Invalid email format (e.g. email@example.com)'
                    : 'Please enter your email'
                }
              />
            </section>
            <section className="flex flex-col gap-2 lg:w-full h-full">
              <h2 className="text-sm font-medium">Password</h2>
              <Input
                id="oldPassword"
                type="password"
                label="Enter old password"
                value={formData.oldPassword}
                onChange={handleInputEvent}
              />
              <Input
                id="password"
                type="password"
                label="Enter new password"
                value={formData.password}
                onChange={handleInputEvent}
                onBlur={handleInputEvent}
                isError={formData.isError.password}
                errorMessage={
                  formData.password.length !== 0
                    ? 'Password must consist of minimum 8 characters, at least one uppercase letter, one lowercase letter and one number'
                    : 'Please enter your password'
                }
              />
            </section>
            <div className="flex justify-between my-10">
              <button className="w-28 bg-black hover:bg-zinc-800 rounded-md text-sm font-bold text-white p-2">
                Update
              </button>
              <button
                className="w-28 bg-red-700 hover:bg-red-600 rounded-md text-sm font-bold text-white p-2"
                type="button"
                onClick={resetInputs}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
