import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "../style/register.css";
import logSvg from "../img/log.svg";
import registerSvg from "../img/register.svg";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [isSignIn, setIsSignIn] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignIn
      ? "http://localhost:5000/login"
      : "http://localhost:5000/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (isSignIn) {
          console.log("User logged in successfully");
          localStorage.setItem("accessToken", data.token);
          // console.log("from login " + data.token);
          navigate("/courses");
        } else {
          // console.log("User registered successfully");
          toast.success("Registration successful!");
          setIsSignIn(true);
        }
      } else {
        if (isSignIn) {
          toast.error("Incorrect email or password");
        } else {
          toast.error("Registration failed. Account already exists.");
        }
        console.error(isSignIn ? "Logged in failed" : "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className={`container ${isSignIn ? "" : "sign-up-mode"}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            onSubmit={handleSubmit}
            className={isSignIn ? "sign-in-form" : "sign-up-form"}
          >
            <h2 className="title">{isSignIn ? "Sign in" : "Sign up"}</h2>
            {!isSignIn && (
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
            )}
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            {!isSignIn && (
              <div className="role-container">
                <div className="role-group">
                  <span>Role:</span>
                  <div className="radio-buttons">
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={formData.role === "student"}
                        onChange={handleChange}
                      />
                      Student
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="teacher"
                        checked={formData.role === "teacher"}
                        onChange={handleChange}
                      />
                      Teacher
                    </label>
                  </div>
                </div>
              </div>
            )}
            <input
              type="submit"
              className="btn"
              value={isSignIn ? "Sign in" : "Sign up"}
            />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className={`panel left-panel ${isSignIn ? "" : "hidden-panel"}`}>
          <div className="content">
            <h3>New here?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" onClick={toggleForm}>
              Sign up
            </button>
          </div>
          <img src={logSvg} alt="" className="image" />
        </div>
        <div className={`panel right-panel ${isSignIn ? "hidden-panel" : ""}`}>
          <div className="content">
            <h3>One of us?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" onClick={toggleForm}>
              Sign in
            </button>
          </div>
          <img src={registerSvg} alt="" className="image" />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
