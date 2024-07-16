const { TaskRepository } = require("../repositories/task.repository");

// Interactor function to create a new task
async function createTaskInteractor(requestDTO) {
	// Initialize an empty response DTO
	const responseDTO = {};

	// Extract task data from request DTO
	const newTask = {
		name: requestDTO.name,
		description: requestDTO.description,
		priority: requestDTO.priority,
		date: new Date(requestDTO.date),
		status: "PENDING"
	};

	// Create a task repository instance
	const taskRepository = TaskRepository();

	// Call the create method of the task repository to add the new task to the database
	const task = await taskRepository.create(newTask);

	// Populate the response DTO with data from the created task
	responseDTO.id = task.id;
	responseDTO.name = task.name;
	responseDTO.description = task.description;
	responseDTO.priority = task.priority;
	responseDTO.date = task.date;
	responseDTO.status = task.status;

	// Return the response DTO
	return responseDTO;
}

// Export the createTaskInteractor function
module.exports = { createTaskInteractor };