import React from "react";

interface InputProps {
  id: string;
  type: string;
  onChange: (e: any) => void;
  value: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ id, type, onChange, value, label }) => {
  return (
    <div className="relative">
      <input
        className="
            w-64
            h-[4vh]
            border-2
            border-solid
            border-zinc-300
            rounded-lg
            p-4
            peer
            "
        id={id}
        type={type}
        onChange={onChange}
        value={value}
      />
      <label
        className={`
        absolute
        top-0 
        left-0 
        text-sm 
        leading-[4vh] 
        ml-5 
      text-zinc-400 
        peer-focus:text-xs
        transition-all
        ${value ? "hidden" : ""}
        `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
