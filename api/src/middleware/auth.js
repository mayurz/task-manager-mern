const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.decode(token, process.env.JWT_KEY);
    const user = await userModel.findById(decode._id);
    console.log(token);

    if (!user) {
      return res
        .status(401)
        .send({ code: 401, message: "Please authenticate" });
    }
    req.user = user;
  } catch (error) {
    return res.status(401).send({
      code: 401,
      message: "Please authenticate",
    });
  }
  next();
};

module.exports = auth;
