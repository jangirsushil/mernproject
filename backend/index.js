const express = require("express");
const dotenv = require("dotenv");
const connection = require("./dbconnection/dbconnection");
const userRoutes = require("./routes/auth");
const listRoutes = require("./routes/list");
const verifyAccessToken = require("./middlware/authMiddleware");
dotenv.config();
connection();
const path = require("path");
const app = express();
const _dirname = path.resolve();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
const corsOptions = {
  origin: "https://mernproject-hj6r.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1", userRoutes);
app.use("/api/v2", verifyAccessToken, listRoutes);

app.use(express.static(path.join(_dirname, "frontend", "dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port no. ${PORT}`);
});
