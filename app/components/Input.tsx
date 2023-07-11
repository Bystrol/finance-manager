import React from "react";

interface InputProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  onBlur,
  isError,
  errorMessage,
}) => {
  return (
    <div className="relative w-full h-10">
      <input
        className={`
            w-full
            h-full
            py-3
            lg:py-2
            px-4
            border-2
            border-solid
            ${
              isError ? "border-red-600 bg-red-100" : "border-zinc-300 bg-white"
            }
            rounded-lg
            peer
            `}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label
        className={`
        absolute
        top-[50%]
        -translate-y-1/2
        left-4
        text-sm
        lg:text-sm
        px-1
        origin-[0_0]
        ${isError ? "text-red-600" : "text-zinc-400"}
        peer-focus:scale-75
        peer-focus:top-0
        peer-focus:-translate-y-0
        peer-data-[input-active]:scale-75
        peer-data-[input-active]:top-0
        peer-data-[input-active]:-translate-y-0
        transition-all
        `}
        htmlFor={id}
      >
        {label}
      </label>
      {isError && <p className="text-xs mt-2 text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default Input;
