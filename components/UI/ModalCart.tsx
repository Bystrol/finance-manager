interface ModalCartProps {
  children: React.ReactNode;
  onClick: () => void;
}

const ModalCart: React.FC<ModalCartProps> = ({ children, onClick }) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-screen z-10">
      <div
        className="fixed top-0 left-0 w-full h-screen bg-black/50"
        onClick={onClick}
      />
      <div className="flex flex-col justify-center items-center w-3/4 lg:w-1/4 py-6 gap-4 bg-white rounded-md shadow-md z-10">
        {children}
      </div>
    </div>
  );
};

export default ModalCart;
