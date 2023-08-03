import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

interface ItemProps {
  href: string;
  icon: IconType;
  text: string;
  onClick: () => void;
}

const MenuItem: React.FC<ItemProps> = ({ href, icon, text, onClick }) => {
  const Icon = icon;

  return (
    <Link href={href} replace>
      <li
        className="flex items-center gap-x-2 p-2 rounded-md cursor-pointer hover:bg-black/5"
        onClick={onClick}
      >
        <Icon size={20} />
        <p className="font-medium">{text}</p>
      </li>
    </Link>
  );
};

export default MenuItem;
