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
    <div className="relative w-full lg:w-8/12 h-10 md:h-14 lg:h-11">
      <input
        className="
            w-full
            h-full
            py-2
            px-4
            border-2
            border-solid
            border-zinc-300
            rounded-lg
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
        top-[50%] 
        -translate-y-2/4
        left-0 
        text-sm
        md:text-lg 
        lg:text-sm
        ml-4 
        text-zinc-400 
        peer-focus:text-xs
        peer-focus:top-0
        peer-focus:translate-y-0
        transition-all
        ${value ? "text-xs md:text-xs lg:text-xs top-0 translate-y-0" : ""}
        `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
