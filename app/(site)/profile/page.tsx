"use client";

import { useSession } from "next-auth/react";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import Input from "@/app/components/UI/Input";
import blankImage from "../../../public/images/blank-profile-picture.png";
import { isValidEmail } from "@/app/utils/isValidEmail";
import { isValidPassword } from "@/app/utils/isValidPassword";
import { setDataAttribute } from "@/app/utils/setDataAttribute";
import { updateUserCredentials } from "@/app/utils/updateUserCredentials";
import { updateUserPicture } from "@/app/utils/updateUserPicture";

const Profile: React.FC = () => {
  const { data: session, update } = useSession();

  const email = session?.user?.email;

  interface FormData {
    newUsername: string;
    newEmail: string;
    oldPassword: string;
    newPassword: string;
    isError: {
      username: boolean;
      email: boolean;
      password: boolean;
    };
    inputTouched: {
      [key: string]: boolean;
      newUsername: boolean;
      newEmail: boolean;
      newPassword: boolean;
    };
    isFormNotEmpty: boolean;
    [key: string]: string | boolean | { [key: string]: boolean };
  }

  const formInitialState = {
    newUsername: "",
    newEmail: "",
    oldPassword: "",
    newPassword: "",
    isError: {
      username: false,
      email: false,
      password: false,
    },
    inputTouched: {
      newUsername: false,
      newEmail: false,
      newPassword: false,
    },
    isFormNotEmpty: false,
  };

  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(formInitialState);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => {
      const updatedError = {
        username: prevFormData.isError.username,
        email: prevFormData.isError.email,
        password: prevFormData.isError.password,
      };

      let updatedFormNotEmpty = prevFormData.isFormNotEmpty;

      if (id === "newUsername") {
        updatedError.username =
          event.type === "change"
            ? value.length < 3 && prevFormData.inputTouched.newUsername
            : value.length < 3;
        updatedFormNotEmpty = value.length >= 3;
      } else if (id === "newEmail") {
        updatedError.email =
          event.type === "change"
            ? !isValidEmail(value) && prevFormData.inputTouched.newEmail
            : !isValidEmail(value);
        updatedFormNotEmpty = isValidEmail(value);
      } else if (id === "newPassword") {
        updatedError.password =
          event.type === "change"
            ? !isValidPassword(value) && prevFormData.inputTouched.newPassword
            : !isValidPassword(value);
        updatedFormNotEmpty =
          isValidPassword(value) && isValidPassword(formData.oldPassword);
      } else if (id === "oldPassword") {
        updatedFormNotEmpty =
          isValidPassword(value) && isValidPassword(formData.newPassword);
      }

      setDataAttribute(event);
      console.log(updatedFormNotEmpty);

      return {
        ...prevFormData,
        [id]: value,
        inputTouched: {
          ...prevFormData.inputTouched,
          [id]: event.type === "blur" ? true : prevFormData.inputTouched[id],
        },
        isError: updatedError,
        isFormNotEmpty: updatedFormNotEmpty,
      };
    });
  };

  const toggleDropdown = useCallback(() => {
    setShowDropdownMenu((state) => !state);
  }, []);

  const resetInputs = () => {
    setFormData(formInitialState);
    document
      .getElementById("newUsername")!
      .removeAttribute("data-input-active");
    document.getElementById("newEmail")!.removeAttribute("data-input-active");
    document
      .getElementById("oldPassword")!
      .removeAttribute("data-input-active");
    document
      .getElementById("newPassword")!
      .removeAttribute("data-input-active");
  };

  const convertToBase64 = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files![0]);
      reader.onload = async () => {
        const image = String(reader.result);
        await updateUserPicture(email!, image, () => {
          update({
            image,
          });
        });
      };
      reader.onerror = (error) => {
        console.log(error);
      };
      toggleDropdown();
    },
    [toggleDropdown, email, update]
  );

  const clickOutside = useCallback((e: MouseEvent) => {
    const targetNode = e.target as Node;
    if (dropdownRef.current && !dropdownRef.current.contains(targetNode)) {
      setShowDropdownMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", clickOutside);
  }, [clickOutside]);

  const imageStyles = {
    borderRadius: "50%",
    border: "1px solid #c4c6c9",
  };

  return (
    <div className="flex flex-col w-full items-center mt-16 px-3">
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
                src={session?.user?.image ? session.user.image : blankImage}
                alt="profile_picture"
                fill
                style={imageStyles}
                onClick={toggleDropdown}
                className="peer"
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
                    className="file-input"
                    onChange={convertToBase64}
                  />
                  <div
                    onClick={async () => {
                      await updateUserPicture(email!, "", () => {
                        update({
                          image: "",
                        });
                      });
                      toggleDropdown();
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
                await updateUserCredentials(
                  email!,
                  formData.newUsername,
                  formData.newEmail,
                  formData.oldPassword,
                  formData.newPassword,
                  () => {
                    update({
                      name: formData.newUsername,
                      email: formData.newEmail,
                    });
                  }
                ).then(resetInputs);
              } else {
                toast.error("Form is incorrect");
              }
            }}
          >
            <section className="flex flex-col gap-2 lg:w-full h-full">
              <h2 className="text-sm font-medium">Username</h2>
              <p className="text-xs">Current username: {session?.user?.name}</p>
              <Input
                id="newUsername"
                type="text"
                label="Enter new username"
                value={formData.newUsername}
                onChange={handleInputEvent}
                onBlur={handleInputEvent}
                isError={formData.isError.username}
                errorMessage={"Username must consist of minimum 3 characters"}
              />
            </section>
            <section className="flex flex-col gap-2 lg:w-full h-full">
              <h2 className="text-sm font-medium">Email</h2>
              <p className="text-xs">Current email: {session?.user?.email}</p>
              <Input
                id="newEmail"
                type="text"
                label="Enter new email"
                value={formData.newEmail}
                onChange={handleInputEvent}
                onBlur={handleInputEvent}
                isError={formData.isError.email}
                errorMessage={"Invalid email format"}
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
                id="newPassword"
                type="password"
                label="Enter new password"
                value={formData.newPassword}
                onChange={handleInputEvent}
                onBlur={handleInputEvent}
                isError={formData.isError.password}
                errorMessage={
                  "Password must consist of minimum 8 characters, at least one uppercase letter, one lowercase letter and one number"
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
