const { TaskRepository } = require("../repositories/task.repository");

// Interactor function to retrieve all tasks
async function getAllTasksInteractor() {
	// Initialize an empty array for the response DTO
	const responseDTO = [];

	// Create a task repository instance
	const taskRepository = TaskRepository();

	// Retrieve all tasks from the repository
	const tasks = await taskRepository.getAll();

	// Iterate over the retrieved tasks and populate the response DTO
	tasks.forEach(task => {
		responseDTO.push({
			id: task.id,
			name: task.name,
			description: task.description,
			priority: task.priority,
			date: task.date,
			status: task.status
		});
	});

	// Return the populated response DTO
	return responseDTO;
}

// Export the getAllTasksInteractor function
module.exports = { getAllTasksInteractor };