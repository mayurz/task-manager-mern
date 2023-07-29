const express = require("express");
const router = express.Router();
const userCreateRequest = require("../validators/userCreateRequest");
const validateRequest = require("../validators/validateRequest");
const { createUser, userLogin } = require("../controllers/userController");
const loginRequest = require("../validators/loginRequest");
const auth = require("../middleware/auth");

const userModel = require("../models/userModel");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/", validateRequest(userCreateRequest), (req, res) => {
  createUser(req, res);
});

router.post("/login", validateRequest(loginRequest), (req, res) => {
  userLogin(req, res);
});

router.get("/profile", auth, async (req, res) => {
  await req.user.populate("tasks");
  res.send({
    code: 200,
    user: req.user,
    tasks: req.user.tasks,
  });
});

router.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return req.token != token.token;
    });
    await req.user.save();

    res.send({
      code: 200,
      message: "You have been logged out successfully.",
    });
  } catch (error) {
    res.status(501).send();
  }
});

module.exports = router;
