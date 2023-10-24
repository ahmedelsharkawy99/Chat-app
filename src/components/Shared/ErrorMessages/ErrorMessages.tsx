// Packages

// Types and Schemas
import { ErrorMessagesType } from "./types/errorMessagesTypes";

// Data and styles
import "./errorMessage.css";

// Functions and Hooks

// Components

const ErrorMessages: React.FC<ErrorMessagesType> = ({ error }) => {
  const errorElement =
    typeof error === "string" ? (
      <li className="error">{error}</li>
    ) : typeof error === "undefined" ? null : (
      <>
        {error?.map((err) => (
          <li className="error" key={err}>
            {err}
          </li>
        ))}
      </>
    );

  return <ol className="error__list">{errorElement}</ol>;
};

export default ErrorMessages;
