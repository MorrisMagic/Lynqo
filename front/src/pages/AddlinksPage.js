import axios from "axios";
import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";

function AddlinksPage() {
  const [instagram, setInstagram] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios.post("/api/auth/add-links", { link: instagram });
    navigate("/create/name-image-bio");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 md:px-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-xl">
        <h1 className="font-extrabold text-4xl md:text-5xl">Add your links</h1>
        <p className="text-gray-600 text-base md:text-lg">
          Complete the steps below to add your content to your new Lynqo.
        </p>
      </div>

      {/* Form Section */}
      <div className="mt-10 w-full max-w-md space-y-6">
        <h3 className="font-bold text-xl text-center md:text-left">
          Your selections
        </h3>

        {/* Instagram input */}
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500">
          <FaInstagram className="text-pink-500 text-2xl mr-3" />
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@username"
            className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="block w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-indigo-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default AddlinksPage;
