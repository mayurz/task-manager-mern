const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

schema.statics.findTasksByUser = async function (userId) {
  console.log(userId);
  const tasks = await this.find({ owner: userId }).exec();

  return tasks;
};

const Task = mongoose.model("Task", schema);

module.exports = Task;
