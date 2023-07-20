import { isValidEmail } from '@/lib/form/isValidEmail';
import { isValidPassword } from '@/lib/form/isValidPassword';

export const validateInput = (id: string, value: string) => {
  if (id === 'username') {
    return value.length >= 3;
  } else if (id === 'email') {
    return isValidEmail(value);
  } else if ((id = 'password')) {
    return isValidPassword(value);
  }
};
