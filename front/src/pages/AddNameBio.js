import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

function AddNameBio() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview locally
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result); // Show the image immediately
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/auth/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Cloudinary URL:", data.url);

      // Update avatar with Cloudinary URL after upload
      setAvatar(data.url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  const handleSubmit = async () => {
    await axios.post("/api/auth/add-bio", {
      displayname: displayName,
      bio,
      avatar,
    });
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl">
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl">
          Add profile details
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Add your profile image, name, and bio.
        </p>
      </div>

      {/* Form Section */}
      <div className="mt-8 w-full max-w-md space-y-6">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="avatar" className="cursor-pointer relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaPlus className="text-gray-400 text-2xl sm:text-3xl" />
              )}
            </div>
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <span className="text-gray-500 text-xs sm:text-sm">
            Upload Avatar
          </span>
        </div>

        {/* Display Name */}
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
          className="w-full  p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition text-sm sm:text-base"
        />

        {/* Bio */}
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          rows={4}
          className="w-full  p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition resize-none text-sm sm:text-base"
        />

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className="block w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-indigo-700 transition text-sm sm:text-base"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default AddNameBio;
