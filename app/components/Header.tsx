import React, { useCallback, useState } from "react";
import Link from "next/link";
import ProfileImage from "./ProfileImage";
import ProfileMenu from "./ProfileMenu";
import { useSession } from "next-auth/react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { HiBars3BottomLeft } from "react-icons/hi2";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = useCallback(() => {
    setShowProfileMenu((state) => !state);
  }, []);

  if (session && status === "authenticated") {
    return (
      <header className="fixed flex justify-between items-center w-full h-12 bg-white border-b-2 border-black">
        <div className="flex justify-start items-center h-full w-1/2 gap-x-3">
          <HiBars3BottomLeft size={35} className="ml-3 cursor-pointer" />
          <Link href="/" className="flex items-center">
            <RiMoneyDollarCircleFill size={35} />
            <h1 className="text-xl font-bold ml-1">FINEances</h1>
          </Link>
        </div>
        <div
          className="relative h-8 w-8 top-0 right-3 cursor-pointer"
          onClick={toggleProfileMenu}
        >
          <ProfileImage />
        </div>
        {showProfileMenu && (
          <div
            className="fixed w-full h-[200vh] bg-black/10"
            onClick={toggleProfileMenu}
          ></div>
        )}
        <ProfileMenu isVisible={showProfileMenu} onClose={toggleProfileMenu} />
      </header>
    );
  }
  return <div></div>;
};

export default Header;
