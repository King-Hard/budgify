"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { getCollection } from "../configs/databse";
import { createSession } from "../configs/session";
import { SignupFormSchema, LoginFormSchema } from "../models/schema";
import { cookies } from "next/headers";

export async function signup(state, formData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if(!validatedFields.success) return {
    errors: validatedFields.error.flatten().fieldErrors,
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const {email, password} = validatedFields.data;

  const userCollection = await getCollection("users");
  if(!userCollection) return {
    errors: {email: "Server error!"}
  };

  const existingUser = await userCollection.findOne({email});
  if(existingUser) return {
    errors: {email: "An account with this email already exists."},
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  await createSession(result.insertedId.toString(), email);

  return redirect("/admin/dashboard");
};

export async function login(state, formData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if(!validatedFields.success) return {
    errors: validatedFields.error.flatten().fieldErrors,
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const {email, password} = validatedFields.data;

  const userCollection = await getCollection("users");
  if(!userCollection) return {
    errors: {email: "Server error!"}
  };

  const existingUser = await userCollection.findOne({email});
  if(!existingUser) return {
    errors: {email: "Email doesn't exist."},
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if(!matchedPassword) return {
    errors: {password: "Invalid password."},
    email: formData.get("email"),
  };

  await createSession(existingUser._id.toString(), existingUser.email);

  return redirect("/admin/dashboard");
};

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");

  return redirect("/login");
};