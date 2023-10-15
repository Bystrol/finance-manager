'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import blankPicture from '../public/images/blank-profile-picture.png';
import ProfileImage from './ProfileImage';
import Menu from './Menu/Menu';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

const Header: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const { data: session } = useSession();

  const toggleProfileMenu = () => {
    setShowProfileMenu((state) => !state);
  };

  return (
    <header>
      <div className="fixed top-0 left-0 flex justify-between items-center w-full px-3 h-12 bg-white border-b border-black/30">
        <div className="flex justify-start items-center h-full w-1/2">
          <Link href="/" className="flex items-center gap-x-2">
            <RiMoneyDollarCircleFill size={35} />
            <h1 className="text-xl font-bold">FINEances</h1>
          </Link>
        </div>
        <ProfileImage
          onClick={toggleProfileMenu}
          src={session?.user?.image || blankPicture}
        />
      </div>
      {showProfileMenu && (
        <div
          className="fixed top-0 left-0 w-full h-[200vh] bg-black/10 z-10"
          onClick={toggleProfileMenu}
        />
      )}
      <Menu isVisible={showProfileMenu} closeMenu={toggleProfileMenu} />
    </header>
  );
};

export default Header;
