
import React, { useState, useEffect } from "react";
import { useTaskStore } from "../models/TaskModel";
import { toast } from 'react-hot-toast';

interface TaskFormProps {
  taskId?: string;
  title?: string;
  description?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  taskId,
  title: propTitle,
  description: propDescription,
}) => {
  const taskStore = useTaskStore();

  const task = taskId ? taskStore.tasks.find((task) => task.id === taskId) : null;
  const [title, setTitle] = useState(task?.title || propTitle || "");
  const [description, setDescription] = useState(task?.description || propDescription || "");
  const [status, setStatus] = useState<string>(task?.status || "");

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = taskId || Math.random().toString(36).substring(7);
    const newTask = {
      id,
      title,
      description,
      status,
    };

    if (taskId && task) {
      task.title = newTask.title;
      task.description = newTask.description;
      task.status = newTask.status;
    } else {
      taskStore.addTask(newTask);
    }

    if (!taskId) {
      setTitle("");
      setDescription("");
      setStatus("");
    }

    // Persist task data to local storage
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = taskId
      ? tasks.map((task: any) => (task.id === taskId ? newTask : task))
      : [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        // Show toast success message
        toast.success("Task added successfully!");
  };

  return (
    <div>
      <h1 className="text-center mt-7 mb-2 text-2xl font-semibold">Add Your Task</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto shadow-lg rounded-lg p-8">
        {/* Title */}
        <div className="mb-2">
          <label htmlFor="title" className="block text-gray-700 text-lg font-bold mb-2">
            Title
          </label>
          <textarea rows={4}
            id="title" required
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        {/* Description */}
        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Description
          </label>
          <textarea rows={6} required
            id="description"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        {/* Status */}
        <div className="mb-2">
          <label htmlFor="status" className="block text-gray-700 text-lg font-bold mb-2">
            Status
          </label>
          <div>
            <label>
              <input
                type="radio" required
                name="status"
                value="To Do"
                checked={status === "To Do"}
                onChange={handleStatusChange}
              />
              <span className="ml-2">To Do</span>
            </label>
          </div>
          <div>
            <label>
              <input required
                type="radio"
                name="status"
                value="In Progress"
                checked={status === "In Progress"}
                onChange={handleStatusChange}
              />
              <span className="ml-2">In Progress</span>
            </label>
          </div>
          <div>
            <label>
              <input required
                type="radio"
                name="status"
                value="Completed"
                checked={status === "Completed"}
                onChange={handleStatusChange}
              />
              <span className="ml-2">Completed</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
