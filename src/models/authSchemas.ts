import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter valid email" }).optional(),
  password: z
    .string()
    .min(5, "Please enter valid password")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z]).+$/,
      "Please enter a password a least have one capital letter and one small letter"
    )
    .optional(),
});

export const SignupSchema = LoginSchema.extend({
  fullName: z
    .string()
    .min(3, "The Name must be at least 3 characters")
    .optional(),
  imageFile: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type SignupSchemaType = z.infer<typeof SignupSchema>;
