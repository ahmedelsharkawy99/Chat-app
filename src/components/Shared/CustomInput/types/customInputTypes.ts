import { IGetInputProps } from "../../../../hooks/useForm/types/useFormTypes";
import { Input, Lable } from "../../../../types/authTypes";

export type CustomInputProps<T> = {
  input?: Input;
  label?: Lable;
  error?: string | string[];
  isValid?: boolean;
  includeError?: boolean;
  getInputProps?: IGetInputProps<T>;
};
