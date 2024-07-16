const { TaskRepository } = require("../repositories/task.repository");

// Interactor function to retrieve a specific task by ID
async function getTaskInteractor(requestDTO) {
	// Initialize an empty object for the response DTO
	const responseDTO = {};

	// Create a task repository instance
	const taskRepository = TaskRepository();

	// Retrieve the task with the specified ID from the repository
	const task = await taskRepository.get(requestDTO.id);

	// Populate the response DTO with data from the retrieved task
	responseDTO.id = task.id;
	responseDTO.name = task.name;
	responseDTO.description = task.description;
	responseDTO.priority = task.priority;
	responseDTO.date = task.date;
	responseDTO.status = task.status;

	// Return the populated response DTO
	return responseDTO;
}

// Export the getTaskInteractor function
module.exports = { getTaskInteractor };