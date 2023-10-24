import { z } from "zod";
import { Input, Lable, SubmitHandler } from "../../../types/authTypes";

export type CustomFormProps<T extends Record<string, unknown>> = {
  initialValues: T;
  validationSchema: z.Schema<T>;
  onSubmit: SubmitHandler<T>;
  inputsData: {
    input: Input;
    lable?: Lable;
  }[];
};
