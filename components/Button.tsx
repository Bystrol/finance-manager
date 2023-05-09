import React from "react";

interface ButtonProps {
  icon?: any;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ icon, text }) => {
  const Icon = icon;

  return (
    <button
      className="
    flex
    justify-center
    items-center
    border-zinc-300 
    border-2
    w-64
    rounded-lg
    h-[4vh]
    text-sm
    text-zinc-900
    font-bold
    "
    >
      <Icon size={20} className="mr-2" />
      <p>{text}</p>
    </button>
  );
};

export default Button;
