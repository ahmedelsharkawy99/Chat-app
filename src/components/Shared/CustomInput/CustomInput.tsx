// Packages
import { lazy } from "react";

// Types and Schemas
import { CustomInputProps } from "./types/customInputTypes";

// Data and styles
import "./customInput.css";

// Functions and Hooks

// Components
const ErrorMessages = lazy(() => import("../ErrorMessages/ErrorMessages"));

const CustomInput: React.FC<CustomInputProps<Record<string, unknown>>> = ({
  label,
  input,
  getInputProps,
  error,
}) => {
  const inputProps = getInputProps ? getInputProps : input;
  return (
    <>
      {label && (
        <label htmlFor={inputProps?.id} {...label}>
          {label.children}
        </label>
      )}
      <input className={error && "error"} {...inputProps} />

      {error && <ErrorMessages error={error} />}
    </>
  );
};

export default CustomInput;
