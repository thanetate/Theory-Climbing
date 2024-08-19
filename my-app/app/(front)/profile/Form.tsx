"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signOutHandler = () => {
  signOut({ callbackUrl: "/" });
};

const Form = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      setValue("name", session.user.name!);
      setValue("email", session.user.email!);
    }
  }, [router, session, setValue]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
          },
        };
        await update(newSession);
      } else {
        const data = await res.json();
        toast.error(data.message || "error");
      }
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
    }
  };
  return (
    <div className="card-container">
      <div className="profile-card">
        <div className="card-header">
          <h1 className="card-title">Profile</h1>
        </div>
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
              <div className="form-error">{errors.email.message}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {})}
              className="form-input"
            />
            {errors.password?.message && (
              <div className="form-error">{errors.password.message}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
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
          <div className="center-container">
            <div className="pbtn-container">
              <button type="submit" disabled={isSubmitting} className="p-btn">
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Update
              </button>
            </div>
            <div className="pbtn-container">
              <Link className="p-btn" href="/order-history">
                Order History
              </Link>
            </div>
            <div className="pbtn-container">
              <button className="p-btn" type="button" onClick={signOutHandler}>
                Sign Out
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
