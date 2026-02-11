const express = require("express");
const path = require("path");

const router = express.Router();

const users = [];

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.send("User already exists. <a href='/register'>Try again</a>");
  }

  users.push({ username, password });
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.send("Invalid credentials. <a href='/login'>Try again</a>");
  }

  req.session.user = user;
  res.redirect("/dashboard");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
