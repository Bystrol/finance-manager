import { validateInput } from "./validateInput";
import { setDataAttribute } from "@/app/utils/setDataAttribute";
import { FormData, UpdatedError } from "../interfaces/form_interfaces";

export const handleInputEvent = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  const { id, value } = event.target;
  setFormData((prevFormData) => {
    const updatedError: UpdatedError = {
      username: prevFormData.isError.username,
      email: prevFormData.isError.email,
      password: prevFormData.isError.password,
    };

    if (id === `${id}`) {
      switch (event.type) {
        case "focus":
          updatedError[id] = false;
          break;
        case "change":
          updatedError[id] =
            value.length === 0 && prevFormData.inputTouched[id];
          break;
        case "blur":
          updatedError[id] = !validateInput(id, value);
          break;
        default:
          updatedError[id] = false;
      }
    }

    setDataAttribute(event);

    return {
      ...prevFormData,
      [id]: value,
      inputTouched: {
        ...prevFormData.inputTouched,
        [id]: event.type === "blur" ? true : prevFormData.inputTouched[id],
      },
      isError: updatedError,
    };
  });
};
