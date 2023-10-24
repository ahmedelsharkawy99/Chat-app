import { HTMLInputTypeAttribute } from "react";

export type SubmitHandler<T extends Record<string, unknown>> = (
  formValues: T
) => Promise<void>;

export interface Input extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  checked?: boolean;
  accept?: string;
}

export type Lable = React.HTMLAttributes<HTMLLabelElement>;
