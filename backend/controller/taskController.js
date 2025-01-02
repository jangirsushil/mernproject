const User = require("../models/user.js");
const List = require("../models/list.js");

async function addTaskHandler(req, res) {
  const { email } = req;
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({
      message: "Email or task is missing",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newList = new List({ task, createdBy: user._id });
    const tasks = await newList.save();
    user.tasks.push(tasks._id);
    await user.save();

    res.status(201).json({
      message: "Task created successfully",
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while saving the task",
      error: error.message,
    });
  }
}

async function updateTaskHandler(req, res) {
  const { email } = req;
  const { task } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is missing",
    });
  }

  try {
    const existingTask = await List.findById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const user = await User.findOne({ email });
    if (!user || existingTask.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this task",
      });
    }
    existingTask.task = task;
    await existingTask.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: existingTask.task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while updating the task",
      error: error.message,
    });
  }
}

async function deleteTaskHandler(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Task ID is missing",
    });
  }

  try {
    const deletedTask = await List.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const user = await User.findById(deletedTask.createdBy);
    if (user) {
      user.tasks = user.tasks.filter((taskId) => taskId.toString() !== id); // Corrected: `tasks` instead of `body`
      await user.save();
    }

    res.status(200).json({
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while deleting the task",
      error: error.message,
    });
  }
}

async function getTaskHandler(req, res) {
  const { email } = req;
  console.log(email);

  if (!email) {
    return res.status(400).json({
      message: "Email is missing",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const allTasks = await List.find({ createdBy: user._id }).sort({
      createdat: -1,
    });
    if (!allTasks || allTasks.length === 0) {
      return res.status(200).json({
        message: "No tasks found for this user",
      });
    }

    res.status(200).json({
      message: "All tasks fetched successfully",
      tasks: allTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching the tasks",
      error: error.message,
    });
  }
}

async function getTaskHandlerbyId(req, res) {
  const { id } = req.params;
  const { email } = req.body;

  if (!id || !email) {
    return res.status(400).json({
      message: "Task ID or email is missing",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const existingTask = await List.findById(id);
    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (existingTask.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to view this task",
      });
    }

    res.status(200).json({
      message: "Task fetched successfully",
      task: existingTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching the task",
      error: error.message,
    });
  }
}

module.exports = {
  addTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  getTaskHandlerbyId,
};
