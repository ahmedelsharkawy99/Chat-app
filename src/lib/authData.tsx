import addAvater from "../assets/addAvatar.png";
import { LoginSchemaType, SignupSchemaType } from "../models/authSchemas";

export const loginInputsData = [
  {
    input: {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
    },
  },
  {
    input: {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  },
];

export const loginInitialValues: LoginSchemaType = {
  email: "",
  password: "",
};

export const registerInputsData = [
  {
    input: {
      type: "text",
      id: "fullName",
      name: "fullName",
      placeholder: "Display Name",
    },
  },
  {
    input: {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
    },
  },
  {
    input: {
      id: "password",
      type: "password",
      name: "password",
      placeholder: "Password",
    },
  },

  {
    input: {
      type: "file",
      id: "imageFile",
      name: "imageFile",
      className: "hidden",
    },
    lable: {
      children: (
        <>
          <img src={addAvater} alt="add avater" loading="lazy" />
          <span>Add an Avater</span>
        </>
      ),
    },
  },
];

export const signupInitialValues: SignupSchemaType = {
  fullName: "",
  email: "",
  password: "",
  imageFile: null,
};
