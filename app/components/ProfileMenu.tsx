import React from "react";
import ProfileImage from "./ProfileImage";
import MenuItem from "./MenuItem";
import { signOut, useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { SlClose } from "react-icons/sl";

const ProfileMenu: React.FC<{ isVisible: boolean; onClose: () => void }> = ({
  isVisible,
  onClose,
}) => {
  const { data: session, status } = useSession();

  if (session && status === "authenticated") {
    return (
      <div
        className={`${
          !isVisible ? "translate-x-full" : ""
        } fixed top-0 right-0 w-4/5 lg:w-80 h-full bg-white p-5 rounded-l-lg transition-all duration-300`}
      >
        <div className="flex items-center justify-between ml-1 mb-6">
          <div className="flex items-center">
            <ProfileImage />
            <p className="font-bold">Hello, {session?.user?.name}</p>
          </div>
          <SlClose
            size={30}
            className="cursor-pointer hover:scale-110 transition-all"
            onClick={onClose}
          />
        </div>
        <nav>
          <ul className="flex flex-col">
            <MenuItem
              href="profile"
              icon={CgProfile}
              text="Your profile"
              onClick={() => {
                onClose;
              }}
            />
            <MenuItem
              href="/"
              icon={GoSignOut}
              text="Sign out"
              onClick={() => {
                signOut();
                onClose();
              }}
            />
          </ul>
        </nav>
      </div>
    );
  }

  return <div></div>;
};

export default ProfileMenu;
