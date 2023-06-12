import React from "react";

interface ButtonProps {
  icon?: any;
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick }) => {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      type="button"
      className="
    flex
    justify-center
    items-center
    border-zinc-300 
    border-2
    w-full
    lg:w-8/12
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
      <p>{text}</p>
    </button>
  );
};

export default Button;
