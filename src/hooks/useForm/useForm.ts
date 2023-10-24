import { ZodError } from "zod";
import { useCallback, useState } from "react";

import {
  IArgs,
  IErrors,
  IGetInputOptions,
  IGetInputProps,
  IHandleSubmit,
} from "./types/useFormTypes";

const useForm = <T>({
  initialValues,
  validationSchema,
  resetOnSubmit = true,
}: IArgs<T>) => {
  const [values, _setValues] = useState<T>(initialValues);
  const [errors, _setErrors] = useState<IErrors<T>>(undefined);
  const [isSubmited, _setIsSubmited] = useState<boolean>(false);
  const [isLoading, _setIsLoading] = useState<boolean>(false);

  const reset = useCallback(() => {
    _setErrors(undefined);
    _setValues(initialValues);
  }, []);

  const _onChange = useCallback(({ target }: React.ChangeEvent<unknown>) => {
    let finalValue: string | boolean | unknown;
    let key: string;

    if (target instanceof HTMLInputElement) {
      const { type, checked, value, name, files } = target;
      finalValue =
        type === "checkbox" ? checked : type === "file" ? files?.[0] : value;
      key = name;
    } else if (target instanceof HTMLTextAreaElement) {
      const { value, name } = target;
      finalValue = value;
      key = name;
    }
    _setValues((currentValues) => ({ ...currentValues, [key]: finalValue }));
  }, []);

  const _onBlur = ({
    target,
  }: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = target;
    if (isSubmited && errors && name in errors) _validate();
    else return;
  };

  const _validate = useCallback(() => {
    try {
      validationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorObj = error.issues.reduce((acc, { path, message }) => {
          if (path[0] in acc)
            return {
              ...acc,
              [path[0]]: [acc[path[0] as keyof typeof acc], message],
            };
          return {
            ...acc,
            [path[0]]: message,
          };
        }, {});

        _setErrors(errorObj as IErrors<T>);
        return errorObj;
      }
    }
    return {};
  }, [values, validationSchema]);

  const getInputProps = useCallback(
    (inputName: keyof T, { input, includeError }: IGetInputOptions) => {
      const props: IGetInputProps<T> = { ...input, name: inputName };

      props.onChange = _onChange;
      props.onBlur = _onBlur;

      if (props.type === "checkbox") {
        props.checked = values[inputName] as boolean | undefined;
      } else if (props.type === "file") {
        props.value = "";
      } else props.value = values[inputName] as string | undefined;

      if (includeError) props.error = errors?.[inputName][0];

      return props;
    },
    [errors, values]
  );

  const submitForm =
    (handleSubmit: IHandleSubmit<T>) => async (e: React.FormEvent) => {
      e.preventDefault();
      _setIsLoading(true);
      const validationErrors = _validate();
      _setIsSubmited(true);
      if (Object.keys(validationErrors).length !== 0)
        return _setIsLoading(false);
      await handleSubmit(values);
      if (resetOnSubmit) reset();
      _setIsLoading(false);
    };

  const getInputsValues = useCallback(
    (name?: keyof T) => {
      if (!name) return values;
      else return values?.[name];
    },
    [values]
  );

  const setValue = useCallback(
    (name: keyof T, value: T) => {
      _setValues((prevValues) => ({ ...prevValues, [name]: value }));
    },
    [values]
  );

  return {
    errors,
    isLoading,
    getInputProps,
    getInputsValues,
    setValue,
    submitForm,
    reset,
  };
};

export default useForm;
