import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function SignInInput({ onSignIn }) {
  const [email, handleEmailChange, setEmail] = useInput("");
  const [password, handlePasswordChange, setPassword] = useInput("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage("Please enter your email");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Please enter your password");
      return;
    }
    // Simulate incorrect credentials
    if (email !== "user@example.com" || password !== "password123") {
      setErrorMessage("Invalid email or password");
      return;
    }
    // Simulate successful sign-in
    onSignIn({ email, password });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}{" "}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Your email..."
            onChange={handleEmailChange}
            value={email}
            id="email"
            className="form-control"
          />
        </div>{" "}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Your password..."
            onChange={handlePasswordChange}
            value={password}
            id="password"
            className="form-control"
          />{" "}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Sign In
        </button>
      </form>
      <p className="text-center text-body-secondary mt-2">
        Don&apos;t have an account?
        <Link to="/register"> Register</Link>
      </p>
    </>
  );
}

SignInInput.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default SignInInput;
