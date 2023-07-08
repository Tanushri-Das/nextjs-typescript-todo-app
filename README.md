
# Task Management Application

This is a task management application built with Next.js ,Typescript and MobX.

## Local Development

### Prerequisites
- Node.js and npm should be installed on your machine.

### Steps
1. Clone the repository:git clone [https://github.com/Tanushri-Das/nextjs-typescript-todo-app.git](https://github.com/Tanushri-Das/nextjs-typescript-todo-app.git)
2. Navigate to the project directory: `cd nextjs-typescript-todo-app`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and visit `http://localhost:3000`

## Live Website
The application is deployed and can be accessed at [https://melodic-speculoos-add1f6.netlify.app/](https://melodic-speculoos-add1f6.netlify.app/)

## Features

- Add tasks with title, description, and status
- Edit existing tasks
- Delete tasks
- Local storage persistence for tasks
- Responsive design


4. Open your browser and visit `http://localhost:3000` to access the application.

## Components

### TaskForm

The `TaskForm` component is responsible for adding and editing tasks. It includes a form with fields for title, description, and status. When the form is submitted, the task is added or updated in the task store.

### TaskList

The `TaskList` component displays a list of tasks. It retrieves the tasks from the task store and renders them in a table format. It provides options to edit or delete tasks.

### Navbar

The `Navbar` component is a navigation bar that appears at the top of the application. It includes links to navigate between different pages of the application, such as the Home, About, and Contact pages.

### Footer

The `Footer` component is displayed at the bottom of the application. It includes social media links and copyright information.

## Models

### TaskModel

The `TaskModel` represents the structure of a task object. It includes properties for id, title, description, and status. It also defines actions for updating a task.

### TaskStore

The `TaskStore` manages the tasks in the application. It includes actions for adding, deleting, and updating tasks. It uses MobX for state management and provides an interface to interact with the tasks.

## Usage

To use this application, follow these steps:

1. Add tasks by filling out the form in the TaskForm component.
2. Edit tasks by clicking the Edit button next to a task in the TaskList component.
3. Delete tasks by clicking the Delete button next to a task in the TaskList component.

The tasks will be stored in the local storage of the browser, allowing them to persist across page reloads.


## To demonstrate my understanding of Git by using branches, commits, and pull requests, I followed the following steps:

1. I created a new branch called "feature-xyz" using the command `git branch feature-xyz`.

2. I switched to the new branch using `git checkout feature-xyz` and made several changes to the code and other project files.

3. After making the changes, I used `git add <file-name>` to stage the modified files and then committed the changes using `git commit -m "Implemented feature XYZ"`.

4. I repeated step 2 multiple times, making additional changes and committing them with descriptive commit messages.

5. Once I was satisfied with the changes on the "feature-xyz" branch, I pushed the branch to the remote repository using `git push origin feature-xyz`.

6. On GitHub , I created a pull request, selecting the "feature-xyz" branch as the source branch and the main branch as the target branch (e.g., `master` or `main`).

7. I provided a clear title and description for the pull request, explaining the changes I had made and their purpose.

8. I notified my team members and collaborators about the pull request, and they reviewed my changes, provided feedback, and eventually approved the pull request.

9. Once the pull request was approved, I merged the "feature-xyz" branch into the main branch.

By following these steps, I effectively utilized Git's branching, committing, and pull request features. This workflow allowed me to work on separate branches, manage commits, collaborate with others, and ensure a smooth integration of my changes into the main codebase.