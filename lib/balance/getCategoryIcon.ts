import { FaBusAlt } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiClothes } from 'react-icons/gi';
import { BsQuestionSquare } from 'react-icons/bs';
import { MdWorkOutline } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';

export const getCategoryIcon = (category: string) => {

  switch (category) {
    case 'Food':
      return IoFastFoodOutline;
    case 'Clothes':
      return GiClothes;
    case 'Transport':
      return FaBusAlt;
    case 'Salary':
      return MdWorkOutline;
    case 'Transfer':
      return BiTransfer;
    case 'Others':
      return BsQuestionSquare;
    default:
      return BsQuestionSquare;
  }

};
