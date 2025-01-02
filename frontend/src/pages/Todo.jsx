import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { makeApiRequest } from "../utilis/apiservice";
import "../Components/Todo.css";

const Todo = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const API_URL_V2 = "https://mernproject-hj6r.onrender.com/api/v2";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await makeApiRequest(`${API_URL_V2}/getTasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const formattedTasks = Array.isArray(result.tasks)
          ? result.tasks
          : result.tasks
          ? [result.tasks]
          : []; // Ensure tasks is always an array

        setTasks(formattedTasks);
        setMessage(result.message || "");
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        setMessage("Failed to fetch tasks.");
      }
    };

    fetchTasks();
  }, [trigger]);

  const onSubmit = async (data) => {
    try {
      const endpoint = editingTaskId
        ? `${API_URL_V2}/updateTask/${editingTaskId}`
        : `${API_URL_V2}/addTask`;

      "Request endpoint:", endpoint;

      const method = editingTaskId ? "PUT" : "POST";

      const result = await makeApiRequest(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (result) {
        setMessage(result.message || "Operation successful");
        reset();
        setEditingTaskId(null);
        setTrigger((prev) => !prev);
      }
    } catch (error) {
      console.error("Error in add/edit task:", error.message);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const result = await makeApiRequest(`${API_URL_V2}/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result) {
        setMessage(result.message || "Task deleted successfully");
        setTrigger((prev) => !prev); // Trigger re-fetch
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="todo-input">
        <input
          type="text"
          placeholder="Enter a task"
          {...register("task", { required: "Task is required" })}
        />
        <button type="submit">{editingTaskId ? "Update" : "Add"}</button>
      </form>

      {message === "No tasks found for this user" && <p>{message}</p>}

      <ul className="todo-list">
        {tasks.length > 0 ? (
          tasks.map((task) =>
            task && task._id && task.task ? (
              <li key={task._id}>
                <div className="text-box">
                  <span>{task.task}</span>
                </div>
                <div className="button-box">
                  <button
                    onClick={() => {
                      setEditingTaskId(task._id);
                      setValue("task", task.task);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </li>
            ) : null
          )
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
};

export default Todo;
