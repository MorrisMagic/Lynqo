import React, { useContext, useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaInstagram,
  FaYoutube,
  FaHome,
  FaUser,
  FaLink,
  FaCog,
  FaPalette,
  FaSave,
  FaTwitter,
  FaTiktok,
  FaFacebook,
  FaLinkedin,
  FaSnapchat,
  FaPinterest,
  FaEdit,
  FaCheckCircle,
  FaGlobe,
  FaFont,
} from "react-icons/fa";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Available social media icons for links
const socialIcons = {
  Instagram: <FaInstagram />,
  YouTube: <FaYoutube />,
  Twitter: <FaTwitter />,
  TikTok: <FaTiktok />,
  Facebook: <FaFacebook />,
  LinkedIn: <FaLinkedin />,
  Snapchat: <FaSnapchat />,
  Pinterest: <FaPinterest />,
  Website: <FaGlobe />,
  Other: <FaPlus />,
};

const Fonts = {
  Roboto: "Roboto",
  Story_Script: "Story Script",
  Libertinus_Keyboard: "Libertinus Keyboard",
  Creepster: "Creepster",
  Fraunces: "Fraunces",
};

function AdminPage() {
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkIcon, setNewLinkIcon] = useState("Other");
  const [avatar, setAvatar] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [phone, setPhone] = useState("");

  const saveTheme = async () => {
    try {
      await axios.post(
        "/api/auth/save-theme",
        { primary: theme.primary, secondary: theme.secondary },
        { withCredentials: true }
      );
      alert("Theme saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save theme.");
    }
  };

  const addLink = async () => {
    if (!newLinkUrl) return;
    const newLink = {
      title: newLinkIcon,
      url: newLinkUrl,
      icon: newLinkIcon,
    };
    try {
      const res = await axios.post("/api/auth/addlink", newLink, {
        withCredentials: true,
      });

      // Update local links state immediately
      setLinks((prev) => [...prev, res.data]);

      setNewLinkName("");
      setNewLinkUrl("");
      setNewLinkIcon("Other");
    } catch (err) {
      console.error(err);
      alert("Failed to add link.");
    }
  };

  const handleDeleteLink = async (linkId) => {
    try {
      await axios.post(
        "/api/auth/deletelink",
        { linkId },
        { withCredentials: true }
      );

      // Remove link locally
      setLinks((prev) => prev.filter((link) => link.id !== linkId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete link.");
    }
  };

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

  const handleColorChange = (type, value) => {
    setTheme({ ...theme, [type]: value });
  };
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const { Auth } = useContext(AuthContext);
  const [links, setLinks] = useState(Auth?.links || []);
  const [theme, setTheme] = useState({
    primary: Auth?.theme?.primary || "#6366f1",
    secondary: Auth?.theme?.secondary || "#8b5cf6",
    background: Auth?.theme?.background || "from-indigo-50 to-white",
    text: Auth?.theme?.text || "text-gray-800",
    buttonText: Auth?.theme?.buttonText || "text-white",
  });

  // Store the original theme when component mounts or when Auth changes
  const [originalTheme, setOriginalTheme] = useState(theme);

  useEffect(() => {
    if (Auth?.theme) {
      setTheme(Auth.theme);
      setOriginalTheme(Auth.theme); // sync original with DB theme
    }
  }, [Auth]);

  // When leaving appearance tab, revert theme to original DB theme
  useEffect(() => {
    if (activeTab !== "appearance") {
      setTheme(originalTheme);
    }
  }, [activeTab, originalTheme]);

  const saveBackground = async () => {
    try {
      await axios.post("/api/auth/savethemebg", {
        background: theme.background, // current selected background
      });
      alert("Background saved!");
    } catch (error) {
      console.error(error);
      alert("Failed to save background");
    }
  };
  const [textColor, setTextColor] = useState(
    Auth?.theme?.textColor || "#000000"
  );
  const [selectedFont, setSelectedFont] = useState("");
  const handleSaveProfile = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/add-bio",
        {
          displayName,
          username,
          textColor,
          bio,
          phone,
          selectedFont,
          avatar, // Send Cloudinary URL
        },
        { withCredentials: true }
      );
      console.log("Profile saved:", res.data);
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err.response?.data || err.message);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-20 md:w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 shadow-xl flex flex-col justify-between p-4 transition-all duration-300">
        <div className="space-y-8">
          {/* Logo/Brand */}
          <div className="p-2 mb-6 flex items-center justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
              <span className="text-indigo-600 font-bold text-xl">L</span>
            </div>
            <h1
              style={{ fontFamily: Fonts.Creepster }}
              className="hidden md:block text-xl font-bold text-white ml-3"
            >
              Lynqo
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all group relative overflow-hidden ${
                activeTab === "profile"
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-indigo-100 hover:bg-white/5"
              }`}
            >
              <div
                className={`absolute left-0 w-1 h-6 rounded-r-lg ${
                  activeTab === "profile"
                    ? "bg-white"
                    : "group-hover:bg-white/50"
                }`}
              ></div>
              <FaUser className="text-lg ml-2" />
              <span className="hidden md:inline font-medium">Profile</span>
              {activeTab === "profile" && (
                <div className="absolute right-3 w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("links")}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all group relative overflow-hidden ${
                activeTab === "links"
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-indigo-100 hover:bg-white/5"
              }`}
            >
              <div
                className={`absolute left-0 w-1 h-6 rounded-r-lg ${
                  activeTab === "links" ? "bg-white" : "group-hover:bg-white/50"
                }`}
              ></div>
              <FaLink className="text-lg ml-2" />
              <span className="hidden md:inline font-medium">Links</span>
              {activeTab === "links" && (
                <div className="absolute right-3 w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("appearance")}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all group relative overflow-hidden ${
                activeTab === "appearance"
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-indigo-100 hover:bg-white/5"
              }`}
            >
              <div
                className={`absolute left-0 w-1 h-6 rounded-r-lg ${
                  activeTab === "appearance"
                    ? "bg-white"
                    : "group-hover:bg-white/50"
                }`}
              ></div>
              <FaPalette className="text-lg ml-2" />
              <span className="hidden md:inline font-medium">Appearance</span>
              {activeTab === "appearance" && (
                <div className="absolute right-3 w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all group relative overflow-hidden ${
                activeTab === "settings"
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-indigo-100 hover:bg-white/5"
              }`}
            >
              <div
                className={`absolute left-0 w-1 h-6 rounded-r-lg ${
                  activeTab === "settings"
                    ? "bg-white"
                    : "group-hover:bg-white/50"
                }`}
              ></div>
              <FaCog className="text-lg ml-2" />
              <span className="hidden md:inline font-medium">Settings</span>
              {activeTab === "settings" && (
                <div className="absolute right-3 w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("design")}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all group relative overflow-hidden ${
                activeTab === "design"
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-indigo-100 hover:bg-white/5"
              }`}
            >
              <div
                className={`absolute left-0 w-1 h-6 rounded-r-lg ${
                  activeTab === "design"
                    ? "bg-white"
                    : "group-hover:bg-white/50"
                }`}
              ></div>
              <FaPalette className="text-lg ml-2" />
              <span className="hidden md:inline font-medium">Design</span>
              {activeTab === "design" && (
                <div className="absolute right-3 w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Profile & Footer Section */}
        <div className="space-y-4">
          {/* Profile Preview */}
          <div className="bg-indigo-700/30 p-3 rounded-xl border border-indigo-600/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                {Auth?.coverimg ? (
                  <img
                    src={Auth?.coverimg}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <FaUser />
                )}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white truncate max-w-[140px]">
                  {Auth?.displayname}
                </p>
                <p className="text-xs text-indigo-200 truncate max-w-[140px]">
                  {Auth?.username}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-2">
            <div className="text-xs text-indigo-300 hidden md:block">
              Powered by wooshdotes
            </div>
            <button className="p-2 text-indigo-300 hover:text-white transition-colors">
              <FaCog className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - iPhone Preview */}
        <div className="w-full md:w-2/5 flex items-center justify-center p-6 bg-gray-50">
          <DeviceFrameset device="HTC One" color="black" height={600}>
            <div className="relative w-full h-full">
              {/* Background wallpaper */}
              {theme.background && (
                <img
                  src={theme.background}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {Auth?.wallpaper && (
                <img
                  src={Auth?.wallpaper}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Content on top */}
              <div
                className={`relative flex flex-col items-center p-6 h-full bg-gradient-to-b ${theme.background} overflow-y-auto`}
              >
                {/* Avatar */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg mt-6">
                  {Auth?.coverimg ? (
                    <img
                      src={Auth?.coverimg}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400 text-3xl">
                      <FaUser />
                    </div>
                  )}
                </div>

                {/* Display Name */}
                <h2
                  style={{
                    fontFamily: selectedFont || Auth?.fontstyle || "Roboto",
                    color: textColor || Auth?.textColor || "#000000",
                  }}
                  className="text-xl font-bold text-black"
                >
                  {Auth?.displayname}
                </h2>

                {/* Username */}
                <p
                  style={{
                    fontFamily: selectedFont || Auth?.fontstyle || "Roboto",
                    color: textColor || Auth?.textColor || "#000000",
                  }}
                  className="text-black text-sm"
                >
                  @{Auth?.username}
                </p>
                {console.log(selectedFont)}
                {/* Bio */}
                <p
                  style={{
                    fontFamily: selectedFont || Auth?.fontstyle || "Roboto",
                    color: textColor || Auth?.textColor || "#000000",
                  }}
                  className="text-black text-center mt-2 mb-6 px-4 text-sm"
                >
                  {Auth?.bio}
                </p>

                {/* Links */}
                <div className="w-full flex flex-col space-y-3 mt-2 px-2">
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                      }}
                      className="flex items-center justify-between w-full text-white py-3 px-5 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      <span className="flex items-center space-x-2 font-medium">
                        <span>{socialIcons[link.icon]}</span>
                        <span className="text-sm">{link.title}</span>
                      </span>
                      <span className="text-white text-sm">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </DeviceFrameset>
        </div>

        {/* Right Side - Admin Controls */}
        <div className="w-full md:w-3/5 p-6 overflow-y-auto bg-white">
          <div className="max-w-2xl mx-auto">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <h2 className="font-semibold text-lg text-gray-700">
                      Basic Information
                    </h2>

                    <div className="flex flex-col items-center space-y-3">
                      <label
                        htmlFor="avatar"
                        className="cursor-pointer relative"
                      >
                        <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center mb-1 shadow-md border-2 border-dashed border-gray-300 hover:border-indigo-300 transition-colors">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaPlus className="text-gray-400 text-xl" />
                          )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md">
                          <FaEdit size={14} />
                        </div>
                      </label>
                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <span className="text-gray-500 text-sm">
                        Click to upload avatar
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder={`${Auth?.displayname}`}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={`@${Auth?.username}`}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder={`${Auth?.bio}`}
                        rows={3}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {bio.length}/150 characters
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <h2 className="font-semibold text-lg text-gray-800">
                      Personal Details
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <FaFont className="text-indigo-500" /> Fonts
                      </label>

                      <div className="flex flex-wrap gap-3">
                        {Object.keys(Fonts).map((font, i) => (
                          <div
                            key={i}
                            onClick={() => setSelectedFont(Fonts[font])} // use the value here
                            className={`px-4 py-2 rounded-lg shadow-sm font-medium cursor-pointer transition
    ${
      selectedFont === Fonts[font]
        ? "bg-indigo-600 text-white shadow-md"
        : "bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
    }`}
                          >
                            {Fonts[font]} {/* display the proper name */}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Text Color Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={textColor} // add this state
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-16 h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pick the color for your profile text
                  </p>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-colors shadow-md"
                  >
                    <FaSave />
                    <span>Save Profile</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === "links" && (
              <div className="space-y-6">
                {/* Header Section */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="font-bold text-xl mb-2 text-gray-800">
                    Link Management
                  </h2>
                  <p className="text-gray-500">
                    Add and organize the links you want to share on your profile
                  </p>
                </div>

                {/* Add New Link Card */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-3xl mx-auto">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                    <FaPlus className="text-indigo-600" />
                    Add New Link
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-6">
                    {/* Platform */}
                    <div className="md:col-span-2 w-36">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Platform
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                          {socialIcons[newLinkIcon]}
                        </div>
                        <select
                          value={newLinkIcon}
                          onChange={(e) => setNewLinkIcon(e.target.value)}
                          className="w-full h-12 pl-10 pr-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 bg-white transition"
                        >
                          {Object.keys(socialIcons).map((iconName) => (
                            <option key={iconName} value={iconName}>
                              {iconName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Link Title */}

                    {/* URL */}
                    <div className="md:col-span-6">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com/yourprofile"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        className="w-full h-12 p-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 bg-white transition"
                      />
                    </div>
                  </div>

                  <button
                    onClick={addLink}
                    disabled={!newLinkUrl}
                    className={`w-full md:w-auto bg-indigo-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      !newLinkUrl
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-indigo-700"
                    }`}
                  >
                    <FaPlus className="text-sm" />
                    Add Link
                  </button>
                </div>

                {/* Manage Links Section */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg text-gray-700">
                      Your Links
                    </h3>
                  </div>

                  {links.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
                      <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 mb-3">
                        <FaLink />
                      </div>
                      <h4 className="font-medium text-gray-700">
                        No links added yet
                      </h4>
                      <p className="text-gray-500 text-sm mt-1">
                        Add your first link to get started
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {links.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-all group"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="bg-white p-2.5 rounded-lg shadow-sm border border-gray-200">
                              <span className="text-indigo-600 text-lg">
                                {socialIcons[link.icon]}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {link.name}
                              </h4>
                              <p className="text-gray-500 text-sm truncate max-w-xs">
                                {link.url}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleDeleteLink(link.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Delete link"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tips Section */}
                <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Pro Tips
                  </h4>
                  <ul className="text-sm text-indigo-600 list-disc pl-5 space-y-1">
                    <li>Put your most important links at the top</li>
                    <li>Use custom titles to make your links more engaging</li>
                    <li>Check that all links work correctly</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h2 className="font-semibold text-lg text-gray-700">
                  Customize Appearance
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    {
                      primary: "#6366f1",
                      secondary: "#8b5cf6",
                      name: "Indigo",
                    },
                    { primary: "#3b82f6", secondary: "#60a5fa", name: "Blue" },
                    { primary: "#ef4444", secondary: "#f87171", name: "Red" },
                    { primary: "#10b981", secondary: "#34d399", name: "Green" },
                    { primary: "#f59e0b", secondary: "#fbbf24", name: "Amber" },
                    {
                      primary: "#8b5cf6",
                      secondary: "#a78bfa",
                      name: "Purple",
                    },
                    { primary: "#ec4899", secondary: "#f472b6", name: "Pink" },
                    { primary: "#64748b", secondary: "#94a3b8", name: "Slate" },
                  ].map((color, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setTheme({
                          ...theme,
                          primary: color.primary,
                          secondary: color.secondary,
                        });
                      }}
                      className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      title={color.name}
                    >
                      <div
                        className="h-4"
                        style={{ backgroundColor: color.primary }}
                      ></div>
                      <div
                        className="h-4"
                        style={{ backgroundColor: color.secondary }}
                      ></div>
                      <div className="p-2 bg-white text-center">
                        <span className="text-xs text-gray-600">
                          {color.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-gray-700 mb-3">
                    Custom Colors
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={theme.primary}
                          onChange={(e) =>
                            handleColorChange("primary", e.target.value)
                          }
                          className="w-10 h-10 rounded cursor-pointer"
                        />
                        <span className="text-sm text-gray-600">
                          {theme.primary}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={theme.secondary}
                          onChange={(e) =>
                            handleColorChange("secondary", e.target.value)
                          }
                          className="w-10 h-10 rounded cursor-pointer"
                        />
                        <span className="text-sm text-gray-600">
                          {theme.secondary}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={saveTheme}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <FaSave size={14} />
                    <span>Save Theme</span>
                  </button>

                  <button
                    onClick={() => {
                      setTheme({
                        primary: "#6366f1",
                        secondary: "#8b5cf6",
                        background: "from-indigo-50 to-white",
                        text: "text-gray-800",
                        buttonText: "text-white",
                      });
                    }}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    Reset to Default
                  </button>
                </div>

                <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-3">Preview</h3>
                  <div
                    style={{
                      background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                    }}
                    className="text-white py-3 px-5 rounded-lg text-center"
                  >
                    Your Link Button
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div>
                <h2 className="font-semibold text-lg mb-4 text-gray-700">
                  Settings
                </h2>
                <div className="space-y-4">
                  {/* Profile Visibility */}
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Profile Visibility</h3>
                      <p className="text-sm text-gray-500">
                        Make your profile public or private
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {activeTab === "design" && (
              <div className="space-y-6">
                <h2 className="font-semibold text-lg text-gray-700">
                  Choose Your Background
                </h2>

                {/* Color Presets */}

                <p className="border-b-[1px]"></p>
                <h1 className="font-medium text-xl">Wallpaper</h1>

                {/* Wallpapers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "https://i.pinimg.com/736x/78/73/d4/7873d460b27d011c880d0e3a409387d9.jpg",
                    "https://i.pinimg.com/736x/5e/c4/9c/5ec49cf8529514255d3165bf99a6cd18.jpg",
                    "https://i.pinimg.com/736x/cf/1d/3f/cf1d3fc75c5f480dc49684d0ed903d6c.jpg",
                    "https://i.pinimg.com/736x/29/41/2b/29412b274aeeab992d649c1750d7686f.jpg",
                    "https://i.pinimg.com/736x/8f/ee/d4/8feed46077a39754d998dbec2208fe6f.jpg",
                    "https://i.pinimg.com/736x/62/df/8c/62df8cef889cd23efdcdc343640b8680.jpg",
                  ].map((wallpaper, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        setTheme({ ...theme, background: wallpaper })
                      }
                      className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div
                        className="h-52 bg-cover bg-center"
                        style={{ backgroundImage: `url(${wallpaper})` }}
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center space-x-3">
                  <button
                    onClick={saveBackground}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <FaSave size={14} />
                    <span>Save Background</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
