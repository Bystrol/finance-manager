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
        trasform 
        -translate-y-2/4
        left-4
        text-sm
        md:text-lg 
        lg:text-sm
        bg-white
        px-1
        origin-[0_0]
        text-zinc-400 
        peer-focus:scale-75
        peer-focus:top-0
        peer-focus:-translate-y-[0.4rem]
        peer-data-[input-active]:scale-75
        peer-data-[input-active]:top-0
        peer-data-[input-active]:-translate-y-[0.4rem]
        transition-all
        `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
