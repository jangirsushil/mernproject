const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const {
  generateTokens,
  verifyRefreshToken,
} = require("../utils/tokenUtils.js");

async function createUserHandler(req, res) {
  try {
    const { name, email, password } = req.body;
    "Received Email:", email, name, password;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "User already exists. Please try with another email address.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
}

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user.email);

    const expiry = new Date(Date.now() + 2 * 60 * 1000);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: expiry,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        accessToken,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
}

async function logoutHandler(req, res) {
  try {
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during logout", error: error.message });
  }
}

async function refreshAccessTokenHandler(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const { accessToken } = generateTokens(decoded.email);

    res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error refreshing access token",
      error: error.message,
    });
  }
}

module.exports = {
  createUserHandler,
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
};
