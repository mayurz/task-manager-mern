const userModel = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).json({
      code: 200,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const userLogin = async (req, res) => {
  const user = await userModel.findByCredentials(
    req.body.email,
    req.body.password
  );

  if (!user) {
    return res.status(401).json({
      code: 401,
      message: "Invalid username or password.",
    });
  }

  const token = await user.generateAuthToken();
  return res.json({ code: 200, user, token });
};

module.exports = {
  createUser,
  userLogin,
};
