// Packages
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

// Types and Schemas
import { FirebaseError } from "firebase/app";
import { SubmitHandler } from "../../types/authTypes";
import { SignupSchema, SignupSchemaType } from "../../models/authSchemas";

// Data and styles
import { registerInputsData, signupInitialValues } from "../../lib/authData";
import { firbaseErrors } from "../../firebase/firebaseErrors";

// Functions and Hooks
import { signup } from "../../firebase/handlers/auth";
import { setData } from "../../firebase/handlers/firestore";
import { uploadImage } from "../../firebase/handlers/storage";
import useAuthContext from "../../hooks/useAuthContext/useAuthContext";

// Components
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import CustomForm from "../../components/CustomForm/CustomForm";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuthContext();

  const submitHandler: SubmitHandler<SignupSchemaType> = async (formValues) => {
    try {
      const { imageFile, ...restFormValues } = formValues;
      const imageUrl = await uploadImage(
        `images/profile/${(restFormValues.email as string) + Date.now()}`,
        imageFile
      );
      const user = await signup(restFormValues, imageUrl);
      await setData("users", user.uid, {
        uid: user.uid,
        fullName: user.displayName,
        email: user.email,
        image: user.photoURL,
      });
      toast.success("Account Created Successfully");
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(
          firbaseErrors[error.code as keyof typeof firbaseErrors] || error.code
        );
      }
    }
  };

  return (
    <AuthLayout authTitle="Register">
      <div className="auth__form-input__container">
        <CustomForm
          initialValues={signupInitialValues}
          validationSchema={SignupSchema}
          inputsData={registerInputsData}
          onSubmit={submitHandler}
        />
      </div>
      <p>
        have an account? <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
