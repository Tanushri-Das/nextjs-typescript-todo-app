
import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import { useTaskStore } from "../models/TaskModel";
import Modal from "react-modal";
import styles from "@@/styles/Styles.module.css";
import { FaTimes } from "react-icons/fa";
import Spinner from "./Spinner/Spinner";


interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const TaskList: React.FC = () => {
  const taskStore = useTaskStore();
  const [storedTasks, setStoredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  const [editingTaskId, setEditingTaskId] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks) as Task[];
      setStoredTasks(tasks);
    }
  
    setLoading(false); // Set loading to false once data is loaded
    console.log("Loading state:", loading); // Log the loading state to the console
  }, []);
  

  useEffect(() => {
    // Set tasks in the task store when the stored tasks change
    taskStore.setTasks(storedTasks);
  }, [storedTasks]);

  const handleDelete = (taskId: string) => {
    taskStore.deleteTask(taskId);

    // Remove task from local storage
    const updatedTasks = storedTasks.filter((task) => task.id !== taskId);
    setStoredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEdit = (
    taskId: string,
    title: string,
    description: string,
    status: string
  ) => {
    setEditingTaskId(taskId);
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedStatus(status);
  };

  const handleUpdate = (taskId: string) => {
    const updatedTask = {
      id: taskId,
      title: editedTitle,
      description: editedDescription,
      status: editedStatus,
    };

    taskStore.updateTask(updatedTask);

    // Update task in local storage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      const updatedTasks = tasks.map((task: any) =>
        task.id === taskId ? updatedTask : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    // Reset the editing state
    setEditingTaskId("");
    setEditedTitle("");
    setEditedDescription("");
    setEditedStatus("");
  };

  return useObserver(() => (
    <div className="">
      <h1 className="text-center mt-16 mb-12 text-2xl font-semibold">View All Task</h1>
      <div>
        {loading ? (
          <Spinner/> // Render the spinner while data is loading
        ) : (
          <table className="min-w-full bg-white mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-lg">Title</th>
                <th className="py-2 px-4 border-b text-lg">Description</th>
                <th className="py-2 px-4 border-b text-lg">Status</th>
                <th className="py-2 px-4 border-b text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskStore.tasks.map((task) => (
                <React.Fragment key={task.id}>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">{task.title}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {task.description}
                    </td>
                    <td className="py-2 px-4 border-b text-center">{task.status}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        onClick={() =>
                          handleEdit(
                            task.id,
                            task.title,
                            task.description,
                            task.status
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 sm:mt-0"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isOpen={Boolean(editingTaskId)}
        onRequestClose={() => setEditingTaskId("")}
        contentLabel="Edit Task Modal"
        className={`${styles.modal} ${styles.afterOpen} ${styles.beforeClose}`}
        overlayClassName={`${styles.overlay} ${styles.afterOpen} ${styles.beforeClose}`}
      >
        <div className="flex justify-between items-baseline">
          <h2 className="font-semibold text-2xl mb-4">Edit Task</h2>
          <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={() => setEditingTaskId("")}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>


        <form onSubmit={() => handleUpdate(editingTaskId)}>
          <div className="mb-2">
            <label
              htmlFor="editTitle"
              className="block font-medium text-lg mb-1"
            >
              Title
            </label>
            <textarea rows={3}
            id="editTitle" required
            placeholder="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
            
          </div>
          <div className="mb-2">
            <label
              htmlFor="editDescription"
              className="block font-medium text-lg mb-1"
            >
              Description
            </label>
            <textarea rows={5} required
              id="editDescription"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            ></textarea>
          </div>
          <div className="mb-2">
            <label
              htmlFor="editStatus"
              className="block font-medium text-xl mb-1"
            >
              Status
            </label>
            <div>
              <label>
                <input
                  type="radio" required
                  name="editStatus"
                  value="To Do"
                  checked={editedStatus === "To Do"}
                  onChange={() => setEditedStatus("To Do")}
                />
                <span className="ml-2">To Do</span>
              </label>
            </div>
            <div>
              <label>
                <input required
                  type="radio"
                  name="editStatus"
                  value="In Progress"
                  checked={editedStatus === "In Progress"}
                  onChange={() => setEditedStatus("In Progress")}
                />
                <span className="ml-2">In Progress</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio" required
                  name="editStatus"
                  value="Completed"
                  checked={editedStatus === "Completed"}
                  onChange={() => setEditedStatus("Completed")}
                />
                <span className="ml-2">Completed</span>
              </label>
            </div>
          </div>

          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update task
          </button>
        </form>{" "}
      </Modal>
    </div>
  ));
};

export default TaskList;
