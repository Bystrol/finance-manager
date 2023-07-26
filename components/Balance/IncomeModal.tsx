import ModalCart from '@/components/UI/ModalCart';

interface IncomeModalProps {
  onClick: () => void;
}

const IncomeModal: React.FC<IncomeModalProps> = ({ onClick }) => {
  return (
    <ModalCart onClick={onClick}>
      <p>income modal</p>
    </ModalCart>
  );
};

export default IncomeModal;
