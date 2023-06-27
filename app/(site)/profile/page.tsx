"use client";

import { useSession } from "next-auth/react";
import { useState, useCallback, useRef } from "react";
import { redirect } from "next/navigation";
import { Triangle } from "react-loader-spinner";
import Image from "next/image";
import blankImage from "../../../public/images/blank-profile-picture.png";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const { data: session, status, update } = useSession();

  if (status === "unauthenticated") {
    redirect("/auth");
  }

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  const dropdownRef: React.LegacyRef<HTMLDivElement> = useRef(null);

  const toggleDropdownHandler = useCallback(() => {
    setShowDropdownMenu((state) => !state);
  }, []);

  const updateUserHandler = useCallback(
    async (email: string, image: string) => {
      try {
        await axios.post("/api/update", { email, image }).then(() => {
          update({ image: image });
        });
      } catch (error) {
        console.log(error);
      }
    },
    [update]
  );

  const convertToBase64 = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = session?.user?.email;
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
    [session?.user?.email, toggleDropdownHandler, updateUserHandler]
  );

  const clickOutsideHandler = useCallback((e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdownMenu(false);
    }
  }, []);

  document.addEventListener("click", clickOutsideHandler);

  const imageStyles = {
    borderRadius: "50%",
    border: "1px solid #c4c6c9",
  };

  if (status === "authenticated") {
    return (
      <div className="flex flex-col mt-16 px-3 gap-2">
        <h1 className="text-xl font-medium">
          {session?.user?.name}&apos;s profile
        </h1>
        <hr />
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
            onClick={toggleDropdownHandler}
          />
          <button
            className="absolute bottom-0 right-0 p-1 m-2 flex items-center gap-x-1 bg-white rounded-md text-sm"
            onClick={toggleDropdownHandler}
          >
            <FaRegEdit />
            <p>Edit</p>
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
              >
                <p className="text-sm p-2">Remove</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-4xl font-bold">
      <Triangle width={100} height={100} wrapperClass="absolute" color="#fff" />
    </main>
  );
};

export default Profile;
