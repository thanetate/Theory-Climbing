//client side rendering
"use client";
//imports from hooks and components
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

//type for form inputs
type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

//for handling the profile form
const Form = () => {
  //accessing the session and router
  const { data: session } = useSession();
  const params = useSearchParams();
  const router = useRouter();
  //for setting the form values
  let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    const { name, email, password } = form;

    try {
      //calls the api to register the user
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        //redirects to the callbackUrl with a success message
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
        );
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf("E11000") === 0
          ? "Email is duplicate"
          : err.message;
      toast.error(error || "error");
    }
  };
  return (
    <div className="card-container">
      <div className="profile-card">
        <h1 className="card-title">Register</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              className="form-input"
            />
            {errors.name?.message && (
              <div className="form-error">{errors.name.message}</div>
            )}
          </div>
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
              <div className="form-error"> {errors.email.message}</div>
            )}
          </div>
          <div className="form-group">
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
          <div className="">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords should match!";
                },
              })}
              className="form-input"
            />
            {errors.confirmPassword?.message && (
              <div className="form-error">{errors.confirmPassword.message}</div>
            )}
          </div>
          <div className="pbtn-container">
            <button type="submit" disabled={isSubmitting} className="p-btn">
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Register
            </button>
          </div>
        </form>

        <div className="divider"> </div>
        <div className="form-question">
          Already have an account?{" "}
          <Link className="fq-link" href={`/signin?callbackUrl=${callbackUrl}`}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
