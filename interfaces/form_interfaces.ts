export interface FormData {
  username: string;
  email: string;
  password: string;
  variant: string;
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

export interface UpdatedError {
  [key: string]: boolean;
  username: boolean;
  email: boolean;
  password: boolean;
}
