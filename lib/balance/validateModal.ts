import {
  IsModalEmptyProps,
  TransactionData,
} from '@/interfaces/operation_interfaces';

export const validateModal = async (
  transactionData: TransactionData,
  setIsEmpty: React.Dispatch<React.SetStateAction<IsModalEmptyProps>>,
): Promise<boolean> => {
  let isModalValid: boolean = true;

  await setIsEmpty((prevIsEmpty) => {
    const updatedIsEmpty: IsModalEmptyProps = {
      description: prevIsEmpty.description,
      category: prevIsEmpty.category,
      amount: prevIsEmpty.amount,
    };

    if (transactionData.description === '') {
      updatedIsEmpty.description = true;
      isModalValid = false;
    } else {
      updatedIsEmpty.description = false;
    }

    if (transactionData.category === '') {
      updatedIsEmpty.category = true;
      isModalValid = false;
    } else {
      updatedIsEmpty.category = false;
    }

    if (transactionData.amount === 0) {
      updatedIsEmpty.amount = true;
      isModalValid = false;
    } else {
      updatedIsEmpty.amount = false;
    }

    return {
      description: updatedIsEmpty.description,
      category: updatedIsEmpty.category,
      amount: updatedIsEmpty.amount,
    };
  });

  return isModalValid;
};
