const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
app.use(express.static("public"));
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/", authRoutes);
app.use("/", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
