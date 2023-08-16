import { validateInput } from './validateInput';
import { setDataAttribute } from '@/lib/form/setDataAttribute';
import { FormData, RegisterUpdatedError } from '@/interfaces/form_interfaces';

export const handleInputEvent = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
) => {
  const { id, value } = event.target;
  setFormData((prevFormData) => {
    const updatedError: RegisterUpdatedError = {
      username: prevFormData.isError.username!,
      email: prevFormData.isError.email,
      password: prevFormData.isError.password,
    };

    if (event.type === 'change') {
      updatedError[id] =
        !validateInput(id, value) && prevFormData.inputTouched[id]!;
    } else if (event.type === 'blur') {
      updatedError[id] = !validateInput(id, value);
    }

    setDataAttribute(event);

    return {
      ...prevFormData,
      [id]: value,
      inputTouched: {
        ...prevFormData.inputTouched,
        [id]: event.type === 'blur' ? true : prevFormData.inputTouched[id],
      },
      isError: updatedError,
    };
  });
};
