const express = require("express");
const {
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
} = require("../controllers/AuthControllers");
const AuthWare = require("../middleware/AuthWare");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cloudinary = require("../utils/cloudinary");

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "lynqo", // optional
    });
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/signup", signup);
router.post("/login", login);

router.post("/add-links", AuthWare, addlinks);
router.post("/add-bio", AuthWare, addbio);
router.get("/getmyprofile", AuthWare, getmyprofile);
router.post("/addlink", AuthWare, addonelink);
router.post("/deletelink", AuthWare, deletelink);
router.post("/save-theme", AuthWare, savetheme);
router.post("/getuser", getusername);
router.post("/savethemebg", AuthWare, savethemebg);
router.post("/logout", logout);

module.exports = router;
