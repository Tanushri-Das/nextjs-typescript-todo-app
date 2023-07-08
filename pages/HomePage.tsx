import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTaskStore } from "../models/TaskModel";
import Spinner from "../components/Spinner/Spinner";

const DynamicTaskList = dynamic(() => import("../components/TaskList/TaskList"), {
  ssr: false,
});

const DynamicTaskForm = dynamic(() => import("../components/TaskForm/TaskForm"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  const taskStore = useTaskStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      taskStore.setTasks(tasks);
    }

    setLoading(false);
  }, []);

  return (
    <div className="mb-20">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <DynamicTaskForm />
          <DynamicTaskList />
        </>
      )}
    </div>
  );
};

export default HomePage;
