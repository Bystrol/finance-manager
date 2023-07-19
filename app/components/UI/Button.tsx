import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  icon: IconType;
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon: Icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="
    flex
    justify-center
    items-center
    border-zinc-300 
    border
    w-full
    h-10
    md:h-14
    lg:h-11
    py-2
    rounded-lg
    text-sm
    md:text-xl
    lg:text-base
    text-zinc-900
    font-bold
    hover:shadow-md
    "
    >
      <Icon size={25} className="mr-2" />
      <p className="pointer-events-none">{text}</p>
    </button>
  );
};

export default Button;
