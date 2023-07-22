export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  isError: {
    username: boolean;
    email: boolean;
    password: boolean;
  };
  inputTouched: {
    [key: string]: boolean;
    username: boolean;
    email: boolean;
    password: boolean;
  };
}

export interface LoginFormData {
  email: string;
  password: string;
  isError: {
    email: boolean;
    password: boolean;
  };
  inputTouched: {
    [key: string]: boolean;
    email: boolean;
    password: boolean;
  };
}

export interface RegisterUpdatedError {
  [key: string]: boolean;
  username: boolean;
  email: boolean;
  password: boolean;
}

export interface LoginUpdatedError {
  [key: string]: boolean;
  email: boolean;
  password: boolean;
}
