import React from "react";

interface InputProps {
  id: string;
  type: string;
  onChange: (e: any) => void;
  value: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ id, type, onChange, label }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        className="
            w-[70%]
            h-[4vh]
            border-2
            border-solid
            rounded-lg
            text-sm
            p-4
            "
        id={id}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
