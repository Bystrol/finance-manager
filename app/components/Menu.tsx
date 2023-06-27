import React from "react";
import ProfileImage from "./ProfileImage";
import MenuItem from "./MenuItem";
import { signOut, useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { SlClose } from "react-icons/sl";
import { IoHomeOutline } from "react-icons/io5";

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
        } fixed top-0 right-0 w-4/5 lg:w-80 h-full bg-white p-5 rounded-l-lg transition-all duration-300 z-10`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ProfileImage />
            <p className="font-bold ml-2">{session?.user?.name}</p>
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
              onClick={onClose}
            />
            <hr />
            <MenuItem
              href="/"
              icon={IoHomeOutline}
              text="Home"
              onClick={onClose}
            />
            <hr />
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
