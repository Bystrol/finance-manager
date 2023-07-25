import { IconType } from 'react-icons';

interface OperationButtonProps {
  icon: IconType;
  text: string;
  onClick: () => void;
}

const OperationButton: React.FC<OperationButtonProps> = ({
  icon: Icon,
  text,
  onClick,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <button
        className="flex justify-center items-center w-16 h-16 bg-white rounded-full hover:shadow-xl hover:scale-110 transition-all"
        onClick={onClick}
      >
        <Icon size={25} />
      </button>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default OperationButton;
