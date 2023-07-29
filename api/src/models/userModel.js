const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: null,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    virtuals: {
      tasks: {
        options: { ref: "Task", localField: "_id", foreignField: "owner" },
      },
    },
  }
);

schema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_KEY);

  this.tokens = this.tokens.concat({ token });

  return token;
};

schema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  return user;
};

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

// Exclude password field from query results by default
schema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.tokens;

    return ret;
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
