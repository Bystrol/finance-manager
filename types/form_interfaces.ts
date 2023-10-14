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

export interface UpdatedError {
  [key: string]: boolean | undefined;
  username?: boolean;
  email: boolean;
  password: boolean;
}

export interface UpdatedTouched extends UpdatedError {}
