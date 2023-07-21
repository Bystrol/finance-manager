import { isValidEmail } from '@/lib/form/isValidEmail';
import { isValidPassword } from '@/lib/form/isValidPassword';

export const validateInput = (id: string, value: string) => {
  if (id === 'username' || id === 'newUsername') {
    return value.length >= 3;
  } else if (id === 'email' || id === 'newEmail') {
    return isValidEmail(value);
  } else if (id === 'password' || id === 'newPassword') {
    return isValidPassword(value);
  }
};
