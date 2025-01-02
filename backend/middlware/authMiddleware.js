const jwt = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      message: "Access Token missing",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    decoded;
    req.email = decoded.email;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access Token has expired" });
    } else {
      return res.status(403).json({ message: "Invalid Access Token" });
    }
  }
}

module.exports = verifyAccessToken;
