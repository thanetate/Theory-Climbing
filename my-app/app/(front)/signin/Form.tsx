//client side rendering
"use client";
//imports from hooks and components
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

//type for form inputs
type Inputs = {
  email: string;
  password: string;
};
//for handling the sign in form
const Form = () => {
  //accessing the session
  const { data: session } = useSession();

  //accessing the router and search params
  const params = useSearchParams();
  let callbackUrl = params.get("callbackUrl") || "/";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //redirects to the callbackUrl if the user is already logged in
  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);
  //handling the form submission
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    signIn("credentials", {
      email,
      password,
    });
  };
  return (
    <div className="card-container">
      <div className="profile-card">
        <h1 className="card-title">Sign in</h1>
        {params.get("error") && (
          <div className="form-error">
            {params.get("error") === "CredentialsSignin"
              ? "Invalid email or password"
              : params.get("error")}
          </div>
        )}
        {params.get("success") && (
          <div className="form-error">{params.get("success")}</div>
        )}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Email is invalid",
                },
              })}
              className="form-input"
            />
            {errors.email?.message && (
              <div className="form-error">{errors.email.message}</div>
            )}
          </div>
          <div className="">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="form-input"
            />
            {errors.password?.message && (
              <div className="form-error">{errors.password.message}</div>
            )}
          </div>
          <div className="pbtn-container">
            <button type="submit" disabled={isSubmitting} className="p-btn">
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Sign in
            </button>
          </div>
        </form>
        <div className="form-question">
          Need an account?{" "}
          <Link
            className="fq-link"
            href={`/register?callbackUrl=${callbackUrl}`}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Form;
