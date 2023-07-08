
import Navbar from "@@/components/Shared/Navbar/Navbar";
import dynamic from "next/dynamic";

const DynamicTaskList = dynamic(() => import("../components/TaskList"), {
  ssr: false,
});

const DynamicTaskForm = dynamic(() => import("../components/TaskForm"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  return (
    <div className='mb-32'>
      <Navbar/>
      <div>
        <DynamicTaskForm />
        <DynamicTaskList />
      </div>
    </div>
  );
};

export default HomePage;
