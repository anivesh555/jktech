
const express = require("express");
const router = express.Router();

const {
    registerUser,
    login,
    logout
  } = require("./controller");

router.post("/register", registerUser);
router.post("/login", login);

// could implement later
// router.get("/logout", verifyToken, logout);

module.exports = router;