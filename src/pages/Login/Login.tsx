// Packages
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

// Types and Schemas
import { FirebaseError } from "firebase/app";
import { SubmitHandler } from "../../types/authTypes";
import { LoginSchema, LoginSchemaType } from "../../models/authSchemas";

// Data and styles
import { loginInitialValues, loginInputsData } from "../../lib/authData";
import { firbaseErrors } from "../../firebase/firebaseErrors";

// Functions and Hooks
import { login } from "../../firebase/handlers/auth";
import useAuthContext from "../../hooks/useAuthContext/useAuthContext";

// Components
import CustomForm from "../../components/CustomForm/CustomForm";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuthContext();

  const submitHandler: SubmitHandler<LoginSchemaType> = async (formValues) => {
    try {
      const user = await login(formValues);
      setCurrentUser(user);
      navigate("/");
      toast.success("Successfully logged in");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(
          firbaseErrors[error.code as keyof typeof firbaseErrors] || error.code
        );
      }
    }
  };

  return (
    <AuthLayout authTitle="Login">
      <CustomForm
        initialValues={loginInitialValues}
        validationSchema={LoginSchema}
        onSubmit={submitHandler}
        inputsData={loginInputsData}
      />
      <p>
        You don't have an account? <Link to="/signup">Register</Link>
      </p>
    </AuthLayout>
  );
}
