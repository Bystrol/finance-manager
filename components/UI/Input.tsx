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
    <div className="relative w-full">
      <input
        className={`
            w-full
            py-3
            px-4
            border
            bg-white
            ${
              isError
                ? 'border-red-700 focus:border-red-700'
                : 'border-zinc-300 focus:border-zinc-300'
            }
            focus:outline-none
            focus:ring-0
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
        top-4
        left-4
        text-sm
        lg:text-sm
        px-1
        origin-[0_0]
        ${isError ? 'text-red-700' : 'text-zinc-400'}
        peer-focus:scale-75
        peer-focus:top-0
        peer-focus:-translate-y-0
        peer-data-[input-active]:scale-75
        peer-data-[input-active]:top-0
        transition-all
        duration-200
        `}
        htmlFor={id}
      >
        {label}
      </label>
      {isError && (
        <p className="text-xs text-left text-red-700">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
