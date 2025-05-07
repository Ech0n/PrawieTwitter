import React from "react";
import "../login.css";
import logo from "../logo.svg";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");
  
  const onSubmit = (data) => {
    //TODO wysyłanie danych do serwera

    reset();
  };

  return (
    <div className="sign">
      <img src={logo} alt="logo" className="logo" />
      <div className="sign-panel">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Login"
            {...register("login", {
              required: "Login is required",
            })}
          />
          {errors.login && <p className="form-error">{errors.login.message}</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min. 6 chars",
              },
            })}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("password2", {
              required: "Password has to be confirmed",
              validate: (value) => value === password || "Passwords have to be indentical",
            })}
          />
          {errors.password2 && (
            <p className="form-error">{errors.password2.message}</p>
          )}
          <input
            type="text"
            placeholder="Email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Incorrect format of email",
              },
            })}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
          <button type="submit" disabled={!isValid}>
            Sign In
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}
