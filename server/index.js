require("dotenv").config();
const express = require("express");
const connectDB = require("./connectdb");
const app = express();
const PORT = process.env.PORT || 5000;
const AuthRouter = require("./Routes/AuthRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// server middlewares
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: true }));
app.use(cors({ origin: "https://lynqo-nllsecbpj-youssefhabbachixxxs-projects.vercel.app/", credentials: true }));
app.use(cookieParser());
// routes middleware
app.use("/api/auth", AuthRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Running on port ${PORT}`);
});
