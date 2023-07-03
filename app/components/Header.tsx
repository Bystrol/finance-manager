import React, { useCallback, useState } from "react";
import Link from "next/link";
import ProfileImage from "./ProfileImage";
import Menu from "./Menu";
import { useSession } from "next-auth/react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const toggleProfileMenu = useCallback(() => {
    setShowProfileMenu((state) => !state);
  }, []);

  if (session && status === "authenticated") {
    return (
      <>
        <header className="fixed top-0 left-0 flex justify-between items-center w-full px-3 h-12 bg-white border-b border-black/30">
          <div className="flex justify-start items-center h-full w-1/2">
            <Link href="/" className="flex items-center gap-x-2">
              <RiMoneyDollarCircleFill size={35} />
              <h1 className="text-xl font-bold">FINEances</h1>
            </Link>
          </div>
          <ProfileImage onClick={toggleProfileMenu} />
        </header>
        {showProfileMenu && (
          <div
            className="fixed top-0 left-0 w-full h-[200vh] bg-black/10 z-10"
            onClick={toggleProfileMenu}
          ></div>
        )}
        <Menu isVisible={showProfileMenu} onClose={toggleProfileMenu} />
      </>
    );
  }
  return <div></div>;
};

export default Header;
