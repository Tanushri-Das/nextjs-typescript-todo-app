import React, { useState, useEffect } from "react";
import { useTaskStore } from "../models/TaskModel";

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = taskId || Math.random().toString(36).substring(7);
    const status = "To Do" || "In Progress" ||  "Completed" ;
    const newTask = {
      id,
      title,
      description,
      status,
    };

    if (taskId && task) {
      task.title = newTask.title;
      task.description = newTask.description;
    } else {
      taskStore.addTask(newTask);
    }

    if (!taskId) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div>
      <h1 className='text-center mt-5 mb-2 text-xl font-semibold'>Add Task</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto shadow-lg rounded-lg p-8">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Status
          </label>
          <div className="flex-col">
          <input type="radio" name="" id="" /><span className="ms-1">To Do</span><br />
          <input type="radio" name="" id="" /><span className="ms-1">In Progress</span><br />
          <input type="radio" name="" id="" /><span className="ms-1">Completed</span>
          </div>
          
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {taskId ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

