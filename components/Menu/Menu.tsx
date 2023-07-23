import ProfileImage from '../ProfileImage';
import blankPicture from '../../public/images/blank-profile-picture.png';
import MenuItem from './MenuItem';
import { signOut, useSession } from 'next-auth/react';
import { CgProfile } from 'react-icons/cg';
import { GoSignOut } from 'react-icons/go';
import { SlClose } from 'react-icons/sl';
import { IoHomeOutline } from 'react-icons/io5';
import { TbPigMoney } from 'react-icons/tb';

const Menu: React.FC<{ isVisible: boolean; closeMenu: () => void }> = ({
  isVisible,
  closeMenu,
}) => {
  const { data: session } = useSession();

  const menuItems = [
    {
      href: '/',
      icon: IoHomeOutline,
      text: 'Home',
      color: '#EA580C',
      onClick: closeMenu,
    },
    {
      href: 'profile',
      icon: CgProfile,
      text: 'Profile',
      color: '#C026D3',
      onClick: closeMenu,
    },
    {
      href: '/expenses',
      icon: TbPigMoney,
      text: 'Expenses',
      color: '#65A30D',
      onClick: closeMenu,
    },
    {
      href: '/',
      icon: GoSignOut,
      text: 'Sign out',
      color: '#BE123C',
      onClick: signOut,
    },
  ];

  return (
    <div
      className={`${
        !isVisible ? 'translate-x-full' : ''
      } fixed top-0 right-0 w-4/5 lg:w-80 h-full bg-white p-5 rounded-l-lg transition-all duration-300 z-10`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ProfileImage src={session?.user?.image || blankPicture} />
          <p className="font-bold ml-2">{session?.user?.name}</p>
        </div>
        <SlClose
          size={30}
          className="cursor-pointer hover:scale-110 transition-all"
          onClick={closeMenu}
        />
      </div>
      <nav>
        <ul className="flex flex-col">
          {menuItems.map((item) => (
            <MenuItem
              key={item.text}
              href={item.href}
              icon={item.icon}
              text={item.text}
              color={item.color}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
