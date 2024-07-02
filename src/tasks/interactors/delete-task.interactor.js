const { TaskRepository } = require("../repositories/task.repository");

// Interactor function to delete a task
async function deleteTaskInteractor(requestDTO) {
	// Create a task repository instance
	const taskRepository = TaskRepository();

	// Call the delete method of the task repository to delete the task with the specified ID
	await taskRepository.delete(requestDTO.id);
}

// Export the deleteTaskInteractor function
module.exports = { deleteTaskInteractor };