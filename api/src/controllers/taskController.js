const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");

const taskCreate = async (req, res) => {
  try {
    const task = new taskModel({ ...req.body, owner: req.user._id });
    await task.save();

    res.status(201).send({
      code: 201,
      task,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const allTasks = async (req, res) => {
  const user = await req.user.populate("tasks");
  res.send({
    code: 200,
    data: user.tasks,
  });
};

const singleTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    res.send({
      code: 200,
      data: task,
    });
  } catch (error) {
    res.send({
      code: 403,
      message: "Error occurred while fetching task details.",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({
      code: 200,
      data: task,
    });
  } catch (error) {
    res.send({
      code: 403,
      message: "Error occurred while fetching task details.",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.send({
        code: 403,
        message: "Error occurred while fetching task details.",
      });
    }
    res.send({
      code: 200,
      message: "Task is deleted successfully.",
    });
  } catch (error) {
    res.send({
      code: 403,
      message: "Error occurred while fetching task details.",
    });
  }
};

module.exports = {
  taskCreate,
  allTasks,
  singleTask,
  updateTask,
  deleteTask,
};
