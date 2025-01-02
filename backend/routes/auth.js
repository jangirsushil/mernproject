const express = require("express");
const router = express.Router();
const {
  createUserHandler,
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
} = require("../controller/authController.js");

router.post("/signup", createUserHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);
router.post("/refresh-token", refreshAccessTokenHandler);

module.exports = router;
