import { z as zod } from "zod";

export const registerSchema = zod.object({
  email: zod
    .string({ required_error: "Required email field" })
    .toLowerCase()
    .email("Invaild email format"),
  fullname: zod
    .string({
      invalid_type_error: "Invaild full name format",
      required_error: "Rquired full name field",
    })
    .min(2, "Minimum 2 characters"),
  password: zod
    .string({
      invalid_type_error: "Invalid password format",
      required_error: "Required password field",
    })
    .min(6, "password must contain at least 6 characters"),
});

export const loginSchema = zod.object({
  email: zod
    .string({ required_error: "Required email field" })
    .toLowerCase()
    .email("Invaild email format"),
  password: zod
    .string({
      invalid_type_error: "Invalid password format",
      required_error: "Required password field",
    })
    .min(6, "password must contain at least 6 characters"),
});
