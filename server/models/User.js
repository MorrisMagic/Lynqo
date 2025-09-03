const mongoose = require("mongoose");
const UserModel = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    displayname: { type: String, default: "" },
    phonenumber: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    coverimg: { type: String, default: "" },
    bio: { type: String, default: "" },
    textColor: { type: String, default: "#000000" },
    fontstyle: { type: String, default: "Roboto" },
    links: {
      type: [
        {
          id: { type: mongoose.Schema.Types.ObjectId, auto: true },
          title: { type: String, required: true, maxlength: 50 },
          url: { type: String, required: true },
          icon: { type: String, default: "" },
        },
      ],
      default: [],
    },
    btncolor: { type: String, default: "" },
    theme: {
      type: {
        primary: { type: String, default: "#6366f1" },
        secondary: { type: String, default: "#8b5cf6" },
      },
      default: { primary: "#6366f1", secondary: "#8b5cf6" },
    },

    wallpaper: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", UserModel);
module.exports = User;
