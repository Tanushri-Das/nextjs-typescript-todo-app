import React, { useState, useEffect } from "react";
import { useTaskStore } from "../../models/TaskModel";
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

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

  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [statusError, setStatusError] = useState<string>("");

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

  const validateForm = () => {
    let isValid = true;

    if (title.trim() === "") {
      setTitleError("Title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (description.trim() === "") {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (status === "") {
      setStatusError("Status is required");
      isValid = false;
    } else {
      setStatusError("");
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const id = taskId || uuidv4();
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
      <h1 className="text-center mt-8 mb-2 text-2xl font-semibold">Add Your Task</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto shadow-lg rounded-lg p-8">
        {/* Title */}
        <div className="mb-2">
          <label htmlFor="title" className="block text-gray-700 text-lg font-bold mb-2">
            Title
          </label>
          <textarea
            id="title"
            rows={3}
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${titleError ? 'border-red-500' : ''}`}
          ></textarea>
          {titleError && <p className="text-red-500 text-[15px] font-bold">{titleError}</p>}
        </div>

        {/* Description */}
        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Description
          </label>
          <textarea
            rows={5}
            id="description"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${descriptionError ? 'border-red-500' : ''}`}
          ></textarea>
          {descriptionError && <p className="text-red-500 font-bold text-[15px]">{descriptionError}</p>}
        </div>

        {/* Status */}
        <div className="mb-2">
          <label htmlFor="status" className="block text-gray-700 text-lg font-bold mb-2">
            Status
          </label>
          <div>
            <label>
              <input
                type="radio"
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
              <input
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
              <input
                type="radio"
                name="status"
                value="Completed"
                checked={status === "Completed"}
                onChange={handleStatusChange}
              />
              <span className="ml-2">Completed</span>
            </label>
          </div>
          {statusError && <p className="text-red-500 text-[15px] font-bold mt-1">{statusError}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;