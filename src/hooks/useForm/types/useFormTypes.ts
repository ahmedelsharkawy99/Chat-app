import { z } from "zod";
import { Input } from "../../../types/authTypes";

export interface IArgs<T> {
  initialValues: T;
  validationSchema: z.Schema<T>;
  resetOnSubmit?: boolean;
}

export type IErrors<T> = Record<keyof T, string[]> | undefined;
export type IHandleSubmit<T> = (values: T) => void;

export interface IGetInputOptions {
  includeError?: boolean;
  input: Input;
}

export interface IGetInputProps<T> extends Input {
  error?: string;
  name?: keyof T;
}
