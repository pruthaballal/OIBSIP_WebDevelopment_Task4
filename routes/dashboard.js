const express = require("express");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

module.exports = router;
