const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ $or: [{ username }, { email }] });
    if (checkUser) {
      return res
        .status(409)
        .json({ message: "Email Or Username already used" });
    }
    const cryptPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: cryptPassword,
    });
    if (newUser) {
      await newUser.save();
    }
    const token = jwt.sign({ id: newUser._id }, process.env.JWTSC, {
      expiresIn: "30d",
    });
      res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true, // Must be true for HTTPS
      sameSite: "none",
    });
    return res.status(201).json({ message: "Account Created successfully" });
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({ message: "Email not found" });
    }
    const cryptPassword = bcrypt.compareSync(
      password,
      checkUser.password || ""
    );
    if (!cryptPassword) {
      return res.status(409).json({ message: "password or email wrong" });
    }

    const token = jwt.sign({ id: checkUser._id }, process.env.JWTSC, {
      expiresIn: "30d",
    });
      res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true, // Must be true for HTTPS
      sameSite: "none",
    });
    return res.status(201).json({ message: "Account Created successfully" });
  } catch (error) {
    console.log(error);
  }
};
const addlinks = async (req, res) => {
  const { link } = req.body;
  try {
    const newlink = {
      title: "instagram",
      url: `https://www.instagram.com/${link}/`,
      icon: "instagram",
    };
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        $push: { links: newlink },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Link added successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
};
const addbio = async (req, res) => {
  const { displayname, bio, avatar, textColor, selectedFont } = req.body;
  try {
    const update = {};
    if (displayname) update.displayname = displayname;
    if (textColor) update.textColor = textColor;
    if (bio) update.bio = bio;
    if (selectedFont) update.fontstyle = selectedFont;

    if (avatar) update.coverimg = avatar; // assuming coverimg is your DB field

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $set: update },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getmyprofile = async (req, res) => {
  try {
    const findUser = await User.findOne({ _id: req.user }).select("-password");
    console.log(findUser);
    res.status(200).json(findUser);
  } catch (error) {
    console.log(error);
  }
};

const addonelink = async (req, res) => {
  const { title, url, icon } = req.body;

  if (!title || !url)
    return res.status(400).json({ msg: "Title and URL are required" });

  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const newLink = { title: icon, url, icon: icon || "" };
    user.links.push(newLink);

    await user.save();

    res.status(201).json(user.links[user.links.length - 1]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
const deletelink = async (req, res) => {
  const { linkId } = req.body;

  if (!linkId) {
    return res.status(400).json({ msg: "Link ID is required" });
  }

  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const newLinks = user.links.filter((link) => link.id.toString() !== linkId);
    user.links = newLinks;

    await user.save();

    res
      .status(200)
      .json({ msg: "Link deleted successfully", links: user.links });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
const savetheme = async (req, res) => {
  try {
    const { primary, secondary } = req.body;
    const user = await User.findById(req.user);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.theme = { primary, secondary };
    await user.save();

    res.status(200).json({ theme: user.theme });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save theme" });
  }
};
const getusername = async (req, res) => {
  const { username } = req.body;
  try {
    const getuser = await User.findOne({ username }).select("-password");
    res.json(getuser);
  } catch (error) {
    console.log(error);
  }
};
const savethemebg = async (req, res) => {
  const { background } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $set: { wallpaper: background } },
      { new: true }
    );
    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only in HTTPS
      sameSite: "lax", // or "none" if cross-domain
      path: "/", // must match the path used when setting
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  addlinks,
  addbio,
  getmyprofile,
  addonelink,
  deletelink,
  savetheme,
  getusername,
  savethemebg,
  login,
  logout,
};
