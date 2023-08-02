import { FaBusAlt } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiClothes } from 'react-icons/gi';
import { BsQuestionSquare } from 'react-icons/bs';
import { MdWorkOutline } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';

export const setCategory = (category: string) => {
  let icon;

  switch (category) {
    case 'Food':
      icon = IoFastFoodOutline;
      break;
    case 'Clothes':
      icon = GiClothes;
      break;
    case 'Transportation':
      icon = FaBusAlt;
      break;
    case 'Salary':
      icon = MdWorkOutline;
      break;
    case 'Transfer':
      icon = BiTransfer;
      break;
    default:
      icon = BsQuestionSquare;
  }

  return icon;
};
