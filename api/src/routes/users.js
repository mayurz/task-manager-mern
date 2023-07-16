const express = require("express");
const router = express.Router();
const userCreateRequest = require("../validators/userCreateRequest");
const validateRequest = require("../validators/validateRequest");
const { createUser, userLogin } = require("../controllers/userController");
const loginRequest = require("../validators/loginRequest");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/", validateRequest(userCreateRequest), (req, res) => {
  createUser(req, res);
});

router.post("/login", validateRequest(loginRequest), (req, res) => {
  userLogin(req, res);
});

router.get("/profile", auth, (req, res) => {
  res.send({
    code: 200,
    user: req.user,
  });
});

module.exports = router;
