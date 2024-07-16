const { TaskRepository } = require("../repositories/task.repository");

// Interactor function to update a task
async function updateTaskInteractor(requestDTO) {
	// Initialize an empty object for the response DTO
	const responseDTO = {};

	// Create a task object with updated data
	const task = {
		id: requestDTO.id,
		name: requestDTO.name,
		description: requestDTO.description,
		priority: requestDTO.priority,
		date: requestDTO.date,
		status: requestDTO.status
	};

	// Create a task repository instance
	const taskRepository = TaskRepository();

	// Call the update method of the task repository to update the task
	const updatedTask = await taskRepository.update(task);

	// Populate the response DTO with data from the updated task
	responseDTO.id = updatedTask.id;
	responseDTO.name = updatedTask.name;
	responseDTO.description = updatedTask.description;
	responseDTO.priority = updatedTask.priority;
	responseDTO.date = updatedTask.date;
	responseDTO.status = updatedTask.status;

	// Return the populated response DTO
	return responseDTO;
}

// Export the updateTaskInteractor function
module.exports = { updateTaskInteractor };