"use client";

import { signup } from "@/lib/controllers/authentication";
import Link from "next/link";
import { useActionState } from "react";

export default function Signup() {
  const [state, action, isLoading] = useActionState(signup, undefined);
  
  return (
    <form
      action={action}
      className="flex justify-center items-center min-h-dvh bg-slate-100"
    >
      <div className="w-90 sm:w-100 border p-5 bg-white rounded-sm shadow-[-6px_6px_0px_#000000]">
        <div className="text-center">
          <h1 className="text-xl font-medium">Welcome to Budjify</h1>
          <p>Sign up using the form below.</p>
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            defaultValue={state?.email}
            required
            name="email"
            id="email"
            type="email"
            className="w-full border py-3 px-4"
          />
          {state?.errors?.email && (
            <p className="text-sm">{state.errors.email}</p>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            defaultValue={state?.password}
            required
            name="password"
            id="password"
            type="password"
            className="w-full border py-3 px-4"
          />
          {state?.errors?.password && (
            <div className="text-sm">
              <p>Password must:</p>
              <ul className="list-disc list-inside ml-4">
                {state.errors.password.map(err => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="confirmPassword" className="font-medium">
            Confirm Password
          </label>
          <input
            defaultValue={state?.confirmPassword}
            required
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            className="w-full border py-3 px-4"
          />
          {state?.errors?.confirmPassword && (
            <p className="text-sm">{state.errors.confirmPassword}</p>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-center border py-3 px-4 text-white font-medium bg-black"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          <div className="flex justify-center space-x-1.5 mt-1">
            <span>Do you have an account?</span>
            <Link
              href="/login"
              className="text-indigo-600 hover:underline underline-offset-2"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
