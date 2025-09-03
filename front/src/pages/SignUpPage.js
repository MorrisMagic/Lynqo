import React, { useState } from "react";
import signbg from "../assets/signupbg.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function SignUpPage() {
  // State for inputs
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      username,
      email,
      password,
    });
    navigate("/create/add-links");
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-10 py-10">
        <div className="max-w-md w-full flex flex-col items-center space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            <span className="text-indigo-600">Welcome to Lynqo</span>
          </h1>

          <p className="text-gray-500 font-medium text-base md:text-lg">
            Create your account below
          </p>

          {/* Username input */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-100 p-3 w-full rounded-xl border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-transparent placeholder:text-gray-400 transition"
            placeholder="lynqo/username"
          />

          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 p-3 w-full rounded-xl border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-transparent placeholder:text-gray-400 transition"
            placeholder="Enter your email"
          />

          {/* Password input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-100 p-3 w-full rounded-xl border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-transparent placeholder:text-gray-400 transition"
            placeholder="Enter your password"
          />

          {/* Continue button + login link */}
          <div className="w-full space-y-3">
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Continue
            </button>

            <p className="text-center text-gray-800 font-medium">
              Already have an account?{" "}
              <Link
                to={"/auth/login"}
                className="text-indigo-600 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>

          <p className="text-sm text-gray-400">Powered by wooshdotes</p>
        </div>
      </div>

      {/* Right side - image */}
      <div className="hidden md:block w-1/2">
        <img
          src={signbg}
          alt="Sign up background"
          className="h-screen w-full "
        />
      </div>
    </div>
  );
}

export default SignUpPage;
