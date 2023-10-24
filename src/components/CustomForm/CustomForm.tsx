// Packages

// Types and Schemas

// Data and styles

// Functions and Hooks
import useForm from "../../hooks/useForm/useForm";

// Components
import Spinner from "../Shared/Spinner/Spinner";
import CustomInput from "../Shared/CustomInput/CustomInput";
import { CustomFormProps } from "./types/customFormTypes";

const CustomForm: React.FC<CustomFormProps<Record<string, unknown>>> = ({
  initialValues,
  validationSchema,
  onSubmit,
  inputsData,
}) => {
  const { isLoading, errors, getInputProps, submitForm } = useForm<
    typeof initialValues
  >({
    initialValues,
    validationSchema,
  });

  return (
    <form className="auth__form" onSubmit={submitForm(onSubmit)}>
      {inputsData.map((data) => (
        <CustomInput
          key={data.input.id}
          error={errors?.[data.input.id]}
          getInputProps={{
            ...getInputProps(data.input.id, {
              input: {
                ...data.input,
              },
            }),
          }}
          label={data.lable}
        />
      ))}

      <button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner loaderColor="#7b96ec" /> : "Submit"}
      </button>
    </form>
  );
};

export default CustomForm;
