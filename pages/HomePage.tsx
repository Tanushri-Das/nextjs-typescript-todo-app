
import Footer from "@@/components/Shared/Footer/Footer";
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
    <div>
      <Navbar/>
      <div>
        <DynamicTaskForm />
        <DynamicTaskList />
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
