const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const validateRequest = require("../validators/validateRequest");
const { taskCreateRequest } = require("../validators/taskCreateRequest");
const {
  taskCreate,
  allTasks,
  singleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/", [auth, validateRequest(taskCreateRequest)], (req, res) => {
  taskCreate(req, res);
});

router.get("/", auth, (req, res) => {
  allTasks(req, res);
});

router.get("/:id", auth, (req, res) => {
  singleTask(req, res);
});

router.patch("/:id", auth, (req, res) => {
  updateTask(req, res);
});

router.delete("/:id", auth, (req, res) => {
  deleteTask(req, res);
});

module.exports = router;
