const express = require("express");
const router = express.Router();
const {
  addTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  getTaskHandlerbyId,
} = require("../controller/taskController");

router.post("/addTask", addTaskHandler);
router.put("/updateTask/:id", updateTaskHandler);
router.delete("/deleteTask/:id", deleteTaskHandler);
router.get("/getTasks", getTaskHandler);
router.get("/getTask/:id", getTaskHandlerbyId);

module.exports = router;
