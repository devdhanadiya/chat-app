import { z as zod } from "zod"

export const registerSchema = zod.object({
    email: zod
        .string({ required_error: "Required email field" })
        .toLowerCase()
        .email("Invaild email format"),
    username: zod
        .string({ invalid_type_error: "Invaild user name format", required_error: "Required user name field" })
        .toLowerCase()
        .trim()
        .min(3, "User name must contain at least 3 characters")
        .max(25, "User name must not be longer than 25 characters"),
    fullname: zod
        .string({ invalid_type_error: "Invaild full name format", required_error: "Rquired full name field" })
        .min(2, "Minimum 2 characters"),
    password: zod
        .string({ invalid_type_error: "Invalid password format", required_error: "Required password field" })
        .min(6, "password must contain at least 6 characters")
})

export const loginSchema = zod.object({
    email: zod
        .string({ required_error: "Required email field" })
        .toLowerCase()
        .email("Invaild email format"),
    password: zod
        .string({ invalid_type_error: "Invalid password format", required_error: "Required password field" })
        .min(6, "password must contain at least 6 characters")
})
