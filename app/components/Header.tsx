import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileImage from "../../public/images/blank-profile-picture.png";
import { useSession } from "next-auth/react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { HiBars3BottomLeft } from "react-icons/hi2";

const Header = () => {
  const { data: session, status } = useSession();

  const imageStyles = {
    borderRadius: "50%",
    border: "1px solid #a2a3a5",
    marginRight: "0.75rem",
  };

  if (session && status === "authenticated") {
    return (
      <header className="fixed flex justify-between items-center w-full h-12 bg-white border-b-2 border-black">
        <div className="flex justify-between items-center h-full w-1/2">
          <HiBars3BottomLeft size={35} className="ml-3" />
          <Link href="/" className="flex items-center">
            <RiMoneyDollarCircleFill size={35} />
            <h1 className="text-xl font-bold ml-1">FINEances</h1>
          </Link>
        </div>
        <div className="relative h-8 w-8 top-0 right-3">
          <Image
            src={session?.user?.image ? session.user.image : ProfileImage}
            alt="profile_picture"
            fill={true}
            style={imageStyles}
          />
        </div>
      </header>
    );
  }

  return (
    <header className="fixed flex justify-between items-center w-full h-12 bg-white border-b-2 border-black">
      <div className="flex justify-between items-center h-full w-1/2">
        <HiBars3BottomLeft size={35} className="ml-3" />
        <Link href="/" className="flex items-center">
          <RiMoneyDollarCircleFill size={35} />
          <h1 className="text-xl font-bold ml-1">FINEances</h1>
        </Link>
      </div>
      <div className="relative h-8 w-8 top-0 right-3">
        <Image
          src={ProfileImage}
          alt="profile_picture"
          fill={true}
          style={imageStyles}
        />
      </div>
    </header>
  );
};

export default Header;
