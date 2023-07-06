import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import { useTaskStore } from "../models/TaskModel";
import Modal from "react-modal";
import styles from "@@/styles/Styles.module.css";
import { FaTimes } from "react-icons/fa";

const TaskList: React.FC = () => {
  const taskStore = useTaskStore();

  const [editingTaskId, setEditingTaskId] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const handleDelete = (taskId: string) => {
    taskStore.deleteTask(taskId);
  };

  const handleEdit = (taskId: string, title: string, description: string, status: string) => {
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

    // Reset the editing state
    setEditingTaskId("");
    setEditedTitle("");
    setEditedDescription("");
    setEditedStatus("");
  };

  return useObserver(() => (
    <div className="mt-8">
      <h1 className="text-center mb-2 text-xl font-semibold">View All Task</h1>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskStore.tasks.map((task) => (
            <tr key={task.id}>
              <td className="py-2 px-4 border-b text-center">{task.title}</td>
              <td className="py-2 px-4 border-b text-center">{task.description}</td>
              <td className="py-2 px-4 border-b text-center">{task.status}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() =>
                    handleEdit(task.id, task.title, task.description, task.status)
                  }
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={Boolean(editingTaskId)}
        onRequestClose={() => setEditingTaskId("")}
        contentLabel="Edit Task Modal"
        className={`${styles.modal} ${styles.afterOpen} ${styles.beforeClose}`}
        overlayClassName={`${styles.overlay} ${styles.afterOpen} ${styles.beforeClose}`}
      >
        <div className="flex justify-between items-baseline">
          <h2 className="font-semibold text-2xl mb-5">Edit Task</h2>
          <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={() => setEditingTaskId("")}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        <form onSubmit={() => handleUpdate(editingTaskId)}>
          <div className="mb-4">
            <label htmlFor="editTitle" className="block font-medium text-xl mb-2">
              Title
            </label>
            <input
              id="editTitle"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="editDescription" className="block font-medium text-xl mb-2">
              Description
            </label>
            <textarea
              id="editDescription"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="editStatus" className="block font-medium text-xl mb-2">
              Status
            </label>
            <div>
              <label>
                <input
                  type="radio"
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
                <input
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
                  type="radio"
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
        </form>
      </Modal>
    </div>
  ));
};

export default TaskList;