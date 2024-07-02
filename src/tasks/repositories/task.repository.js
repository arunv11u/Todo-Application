const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");

// Function to create a Task Repository
function TaskRepository() {
	// Define the file path for storing tasks
	const taskFilePath = path.join(__dirname, "./tasks.json");

	// Return an object with methods for CRUD operations on tasks
	return {
		// Method to create a new task
		create: async function (task) {
			// Read existing tasks from the file
			const tasks = JSON.parse(await fs.promises.readFile(taskFilePath, "utf8"));

			// Generate a unique ID for the new task
			const taskId = uuid();
			task.id = taskId;

			// Add the new task to the tasks array
			tasks.push(task);

			// Write the updated tasks array back to the file
			await fs.promises.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));

			// Return the created task
			return task;
		},
		// Method to update an existing task
		update: async function (task) {
			// Read existing tasks from the file
			const tasks = JSON.parse(await fs.promises.readFile(taskFilePath, "utf8"));

			// Find the index of the task to be updated
			const taskIndex = tasks.findIndex(taskEle => taskEle.id === task.id);

			// Replace the task at the found index with the updated task
			tasks[taskIndex] = task;

			// Write the updated tasks array back to the file
			await fs.promises.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));

			// Return the updated task
			return task;
		},
		// Method to delete a task
		delete: async function (id) {
			// Read existing tasks from the file
			const tasks = JSON.parse(await fs.promises.readFile(taskFilePath, "utf8"));

			// Find the index of the task to be deleted
			const taskIndex = tasks.findIndex(taskEle => taskEle.id === id);

			// Remove the task from the tasks array
			tasks.splice(taskIndex, 1);

			// Write the updated tasks array back to the file
			await fs.promises.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
		},
		// Method to retrieve a task by ID
		get: async function (id) {
			// Read existing tasks from the file
			const tasks = JSON.parse(await fs.promises.readFile(taskFilePath, "utf8"));

			// Find the task with the specified ID
			const task = tasks.find(taskEle => taskEle.id === id);

			// Return the found task
			return task;
		},
		// Method to retrieve all tasks
		getAll: async function () {
			// Read existing tasks from the file
			const tasks = JSON.parse(await fs.promises.readFile(taskFilePath, "utf8"));

			// Return all tasks
			return tasks;
		}
	};
}

// Export the TaskRepository function
module.exports = { TaskRepository };