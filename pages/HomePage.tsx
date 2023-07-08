
import dynamic from "next/dynamic";

const DynamicTaskList = dynamic(() => import("../components/TaskList"), {
  ssr: false,
});

const DynamicTaskForm = dynamic(() => import("../components/TaskForm"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  return (
    <div className="mb-20">
      <DynamicTaskForm />
      <DynamicTaskList />
    </div>
  );
};

export default HomePage;
