import { z } from "zod";

export const SignupFormSchema = z
  .object({
    email: z
      .string()
      .email({message: "Oops! That doesn't look like a valid email."})      
      .trim(),

    password: z
      .string()
      .min(8, {message: "Be at least 8 characters long."})
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {message: "Contain at least one special character."})
      .trim(),  

    confirmPassword: z 
      .string()
      .trim(),
})
  .superRefine((validate, issue) => {
    if(validate.password !== validate.confirmPassword) {
      issue.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password fields doesn't match.",
        path: ["confirmPassword"],
      });
    };
  });

export const LoginFormSchema = z
  .object({
    email: z
      .string()
      .email({message: "Oops! That doesn't look like a valid email."})      
      .trim(),
    
    password: z
      .string()
      .trim(),
});