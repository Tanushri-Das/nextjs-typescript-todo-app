import { types, applySnapshot } from 'mobx-state-tree';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const TaskModel = types
  .model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.string,
  })
  .actions((self) => ({
    updateTask(updatedTask: Task) {
      applySnapshot(self, updatedTask);
    },
  }));

const TaskStore = types
  .model('TaskStore', {
    tasks: types.array(TaskModel),
  })
  .actions((self) => ({
    addTask(task: Task) {
      self.tasks.push(task);
    },
    deleteTask(taskId: string) {
      const taskIndex = self.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        self.tasks.splice(taskIndex, 1);
      }
    },
    updateTask(updatedTask: Task) {
      const task = self.tasks.find((task) => task.id === updatedTask.id);
      if (task) {
        task.updateTask(updatedTask);
      }
    },
  }));

export function createTaskStore() {
  return TaskStore.create({
    tasks: [],
  });
}

export const taskStore = createTaskStore();
export const useTaskStore = () => taskStore;
