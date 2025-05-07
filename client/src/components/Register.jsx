import React from "react";
import "../login.css";
import logo from "../logo.svg";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister.js";
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  const {registerUser, loading, error } = useRegister();

  const password = watch("password");
  
  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result) {
      reset();
      navigate('/login');
    }
  };

  return (
    <div className="sign">
      <img src={logo} alt="logo" className="logo" />
      <div className="sign-panel">
        <h1>Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "username is required",
            })}
          />
          {errors.username && <p className="form-error">{errors.username.message}</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Min. 8 chars",
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

          <button type="submit" disabled={!isValid || loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}
