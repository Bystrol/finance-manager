export interface FormData {
  username?: string;
  email: string;
  password: string;
  isError: {
    username?: boolean;
    email: boolean;
    password: boolean;
  };
  inputTouched: {
    [key: string]: boolean | undefined;
    username?: boolean;
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

export interface RegisterUpdatedTouched {
  [key: string]: boolean;
  username: boolean;
  email: boolean;
  password: boolean;
}

export interface LoginUpdatedTouched {
  [key: string]: boolean;
  email: boolean;
  password: boolean;
}
