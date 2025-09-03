import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaPlus,
  FaSnapchat,
  FaTiktok,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ColorThief from "color-thief-browser";

function ProfilePage() {
  const { username } = useParams();
  const [userdata, setUserdata] = useState(null);
  const [bgColor, setBgColor] = useState(null);

  const socialIcons = {
    Instagram: <FaInstagram />,
    YouTube: <FaYoutube />,
    Twitter: <FaXTwitter />,
    TikTok: <FaTiktok />,
    Facebook: <FaFacebook />,
    LinkedIn: <FaLinkedin />,
    Snapchat: <FaSnapchat />,
    Pinterest: <FaPinterest />,
    Website: <FaGlobe />,
    Other: <FaPlus />,
  };

  const getUser = async () => {
    try {
      const res = await axios.post("/api/auth/getuser", { username });
      setUserdata(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [username]);

  // Extract dominant color from wallpaper
  useEffect(() => {
    if (userdata?.wallpaper) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = userdata.wallpaper;
      img.onload = () => {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      };
    } else {
      setBgColor(null);
    }
  }, [userdata?.wallpaper]);

  if (!userdata) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-100">
        Loading...
      </div>
    );
  }
  return (
    <div
      style={{
        background: bgColor
          ? bgColor
          : `linear-gradient(to right, ${userdata.theme.primary}, ${userdata.theme.secondary})`,
      }}
      className="h-screen flex justify-center items-center p-4"
    >
      <div className="bg-white shadow-2xl rounded-3xl w-[40%] h-[95%] p-16 relative overflow-hidden flex flex-col items-center">
        {/* Wallpaper image inside card */}
        {userdata.wallpaper && (
          <img
            src={userdata.wallpaper}
            alt="wallpaper"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl z-0"
          />
        )}

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black opacity-10 rounded-3xl z-0"></div>

        {/* Avatar */}
        <div className="flex justify-center relative z-10 mt-4">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
            {userdata.coverimg ? (
              <img
                src={userdata.coverimg}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`flex items-center justify-center w-full h-full text-5xl`}
              >
                <FaUser />
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-4 relative z-10">
          <h2
            style={{
              color: userdata.textColor || "#ffffff",
              fontFamily: userdata.fontstyle,
              textShadow: "0 2px 6px rgba(0,0,0,0.7)", // adds shadow for readability
            }}
            className="text-3xl font-bold"
          >
            {userdata.displayname || username}
          </h2>
          <p
            style={{
              fontFamily: userdata.fontstyle,
              textShadow: "0 1px 4px rgba(0,0,0,0.6)", // shadow for username
            }}
            className="text-gray-100"
          >
            @{userdata.username}
          </p>
        </div>

        {/* Bio */}
        {userdata.bio && (
          <p
            className="text-center text-base font-medium mt-2 px-4 relative z-10"
            style={{
              color: userdata.textColor || "#ffffff",
              fontFamily: userdata.fontstyle,
              textShadow: "0 1px 4px rgba(0,0,0,0.7)", // subtle shadow
              backgroundColor: "rgba(0,0,0,0.25)", // optional: translucent background
              borderRadius: "8px",
              padding: "4px 8px",
            }}
          >
            {userdata.bio}
          </p>
        )}

        {/* Links */}
        {userdata.links?.length > 0 && (
          <div className="w-full flex flex-col space-y-2 mt-2 px-2 z-10">
            {userdata.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: `linear-gradient(to right, ${userdata?.theme.primary}, ${userdata?.theme.secondary})`,
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
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
