const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateTokens = (email) => {
  const accessToken = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || "15m",
  });

  const refreshToken = jwt.sign({ email }, JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
  });

  return { accessToken, refreshToken };
};

const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

module.exports = { generateTokens, verifyRefreshToken };
