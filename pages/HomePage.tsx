import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const HomePage: React.FC = () => {
  return (
    <div className=''>
      <h1 className='text-center mt-9 mb-6 text-2xl font-semibold'>Task Management Application</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default HomePage;
