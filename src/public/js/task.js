const uri = "https://todo-application-q4ew.onrender.com";
// const uri = "http://localhost:3000";

// Class representing a task
class Task {
	constructor(
		name,
		description,
		priority,
		date,
		status
	) {
		// Initializing task properties
		this.name = name;
		this.description = description;
		this.priority = priority;
		this.date = date;
		this.status = status;
	}

	// Method to create a new task
	async create() {
		// Create new task object
		const task = {
			name: this.name,
			description: this.description,
			priority: this.priority,
			date: this.date
		};

		await axios.post(uri + "/task", task);
	}

	// Static method to get all tasks
	static async getAll() {
		const tasks = await axios.get(uri + "/task");

		return tasks.data;
	}

	// Static method to get a task by ID
	static async get(id) {
		const task = await axios.get(uri + `/task/${id}`);

		return task.data;
	}

	// Method to update a task
	async update(id) {
		// Create updated task object
		const updatedtask = {
			id: id,
			name: this.name,
			description: this.description,
			priority: this.priority,
			date: this.date,
			status: this.status
		};

		await axios.put(uri + `/task/${id}`, updatedtask);
	}

	// Method to delete a task
	async delete(id) {
		await axios.delete(uri + `/task/${id}`);
	}
}

// Function to validate task name
function validateTaskName(name) {
	if (!name) throw new Error("Activity is required");
}

// Function to validate task description
function validateTaskDescription(description) {
	if (!description) throw new Error("Description is required");
}

// Function to validate task priority
function validateTaskPriority(priority) {
	if (!priority) throw new Error("Priority is required");
}

// Function to validate task date
function validateTaskDate(date) {
	if (!date) throw new Error("Date is required");
}

function formatDate(date) {
	return `${new Date(date).getFullYear().toString()}-${(new Date(date).getMonth()+1).toString().padStart(2, "0")}-${(new Date(date).getDate()).toString().padStart(2, "0")}`;
}

// Exporting Task class and validation functions
export {
	Task,
	validateTaskName,
	validateTaskDescription,
	validateTaskPriority,
	validateTaskDate,
	formatDate
};