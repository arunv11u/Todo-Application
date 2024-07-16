const express = require("express");

// Import validators and interactors
const { validateCreateTaskInputs } = require("../validators/create-task.validator");
const { createTaskInteractor } = require("../interactors/create-task.interactor");
const { validateUpdateTaskInputs } = require("../validators/update-task.validator");
const { updateTaskInteractor } = require("../interactors/update-task.interactor");
const { getAllTasksInteractor } = require("../interactors/get-all-tasks.interactor");
const { validateGetTaskInputs } = require("../validators/get-task.validator");
const { getTaskInteractor } = require("../interactors/get-task.interactor");
const { validateDeleteTaskInputs } = require("../validators/delete-task.validator");
const { deleteTaskInteractor } = require("../interactors/delete-task.interactor");

const router = express.Router();

// Route to get all tasks
router.get("/", async (request, response, next) => {
	try {
		const responseDTO = await getAllTasksInteractor();

		response.status(200).send(responseDTO);
	} catch (error) {
		console.error("Error in getting all tasks list :", error);

		next(error);
	}
});

// Route to create a new task
router.post("/", [validateCreateTaskInputs()], async (request, response, next) => {
	try {
		// Extract task data from request body
		const requestDTO = {
			name: request.body.name,
			description: request.body.description,
			priority: request.body.priority,
			date: new Date(request.body.date)
		};

		// Call createTaskInteractor with extracted data
		const responseDTO = await createTaskInteractor(requestDTO);

		response.status(200).send(responseDTO);
	} catch (error) {
		console.error("Error in creating task :", error);

		next(error);
	}
});

// Route to get a specific task by ID
router.get("/:id", [validateGetTaskInputs()], async (request, response, next) => {
	try {
		// Extract task ID from request parameters
		const requestDTO = {
			id: request.params.id
		};

		// Call getTaskInteractor with extracted task ID
		const responseDTO = await getTaskInteractor(requestDTO);

		response.status(200).send(responseDTO);
	} catch (error) {
		console.error("Error in getting a task :", error);

		next(error);
	}
});

// Route to update a task by ID
router.put("/:id", [validateUpdateTaskInputs()], async (request, response, next) => {
	try {
		// Extract task ID and updated data from request body
		const requestDTO = {
			id: request.params.id,
			name: request.body.name,
			description: request.body.description,
			priority: request.body.priority,
			date: new Date(request.body.date),
			status: request.body.status
		};

		// Call updateTaskInteractor with extracted data
		const responseDTO = await updateTaskInteractor(requestDTO);

		response.status(200).send(responseDTO);
	} catch (error) {
		console.error("Error in updating task :", error);

		next(error);
	}
});

// Route to delete a task by ID
router.delete("/:id", [validateDeleteTaskInputs()], async (request, response, next) => {
	try {
		// Extract task ID from request parameters
		const requestDTO = {
			id: request.params.id
		};

		// Call deleteTaskInteractor with extracted task ID
		const responseDTO = await deleteTaskInteractor(requestDTO);

		response.status(200).send(responseDTO);
	} catch (error) {
		console.error("Error in deleting a task :", error);

		next(error);
	}
});

module.exports = router;