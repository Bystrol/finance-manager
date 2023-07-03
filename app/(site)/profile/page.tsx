"use client";

import { useSession } from "next-auth/react";
import React, { useState, useCallback, useRef } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Triangle } from "react-loader-spinner";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Input from "@/app/components/Input";

import blankImage from "../../../public/images/blank-profile-picture.png";

import axios from "axios";

const Profile = () => {
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  const email = session?.user?.email;

  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [emailInputTouched, setEmailInputTouched] = useState<boolean>(false);

  const dropdownRef: React.LegacyRef<HTMLDivElement> = useRef(null);

  const validateEmailHandler = useCallback((email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }, []);

  const emailErrorHandler = useCallback(
    (newEmail: string) => {
      if (!validateEmailHandler(newEmail)) {
        setIsEmailError(true);
      } else {
        setIsEmailError(false);
      }
    },
    [validateEmailHandler]
  );

  const emailFocusHandler = () => {
    setIsEmailError(false);
  };

  const toggleDropdownHandler = useCallback(() => {
    setShowDropdownMenu((state) => !state);
  }, []);

  const updateUserHandler = useCallback(
    async (email: string, image?: string, newEmail?: string) => {
      try {
        await axios.post("/api/update", { email, image, newEmail }).then(() => {
          update({ image: image, email: newEmail });
          toast.success("Profile updated successfully!");
          setNewEmail("");
        });
      } catch (error) {
        toast.error(Object(error).response.data);
      }
    },
    [update]
  );

  const convertToBase64 = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files![0]);
      reader.onload = async () => {
        const image = String(reader.result);
        await updateUserHandler(email!, image);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
      toggleDropdownHandler();
    },
    [email, toggleDropdownHandler, updateUserHandler]
  );

  const clickOutsideHandler = useCallback((e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdownMenu(false);
    }
  }, []);

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

  document.addEventListener("click", clickOutsideHandler);

  const imageStyles = {
    borderRadius: "50%",
    border: "1px solid #c4c6c9",
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-4xl font-bold">
        <Triangle
          width={100}
          height={100}
          wrapperClass="absolute"
          color="#fff"
        />
      </main>
    );
  }

  return (
    <div className="flex flex-col w-full items-center mt-16 px-3">
      <div className="flex flex-col w-full max-w-7xl gap-2">
        <h1 className="text-xl font-medium">
          {session?.user?.name}&apos;s profile
        </h1>
        <hr className="bg-black/50" />
        <div className="flex flex-col gap-x-10 lg:flex-row lg:justify-between w-full">
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-medium">Profile picture</h2>
            <div
              className="relative h-40 w-40 cursor-pointer rounded-[50%] mb-8"
              ref={dropdownRef}
            >
              <Image
                src={session?.user?.image ? session.user.image : blankImage}
                alt="profile_picture"
                fill
                style={imageStyles}
                onClick={toggleDropdownHandler}
                className="peer"
              />
              <button
                className="absolute bottom-0 right-0 p-1 m-2 flex items-center gap-x-1 bg-white hover:bg-zinc-100 rounded-md text-sm peer-hover:bg-zinc-100"
                onClick={toggleDropdownHandler}
              >
                <FaRegEdit />
                <p className="pointer-events-none">Edit</p>
              </button>
              {showDropdownMenu && (
                <div className="dropdown-menu absolute -bottom-[78px] -right-2 flex flex-col justify-center bg-white w-[65px] rounded-md">
                  <input
                    accept="image/*"
                    type="file"
                    className="file-input"
                    onChange={convertToBase64}
                  />
                  <div
                    onClick={() => {
                      updateUserHandler(session?.user?.email!, "");
                      toggleDropdownHandler();
                    }}
                    className="rounded-b-md hover:bg-zinc-100"
                  >
                    <p className="text-sm p-2 pointer-events-none">Remove</p>
                  </div>
                </div>
              )}
            </div>
          </section>
          <section className="flex flex-col gap-2 lg:w-full h-full">
            <h2 className="text-sm font-medium">Email</h2>
            <p className="text-xs">Current email: {session?.user?.email}</p>
            <form
              className="flex gap-x-2 h-10 lg:w-1/2"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                if (validateEmailHandler(newEmail)) {
                  updateUserHandler(email!, undefined, newEmail);
                } else {
                  setIsEmailError(true);
                }
              }}
            >
              <Input
                id="newEmail"
                type="text"
                label="Enter new email"
                value={newEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNewEmail(e.target.value);
                  setDataAttribute(e);
                  if (emailInputTouched) {
                    emailErrorHandler(e.target.value);
                  }
                }}
                onBlur={() => {
                  emailErrorHandler(newEmail);
                  setEmailInputTouched(true);
                }}
                onFocus={emailFocusHandler}
                isError={isEmailError}
                errorMessage={"Invalid email format"}
              />
              <button className="w-1/5 bg-white hover:bg-zinc-100 border-2 border-solid border-zinc-300 rounded-md text-sm font-bold px-2 py-1">
                Change
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
