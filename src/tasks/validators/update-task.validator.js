

// Validation middleware function for updating a task
const validateUpdateTaskInputs = () => {
	// Return a middleware function to validate request inputs
	return function (request, response, next) {
		try {
			// Check if task ID is provided in request parameters
			if (!request.params.id)
				throw new Error("Task id is required");

			// Check if task name is provided in request body
			if (!request.body.name)
				throw new Error("Task name is required");

			// Check if task description is provided in request body
			if (!request.body.description)
				throw new Error("Task description is required");

			// Check if task priority is provided in request body
			if (!request.body.priority)
				throw new Error("Task priority is required");

			// Check if date is provided
			if (!request.body.date)
				throw new Error("Activity date is required");

			if (!request.body.status)
				throw new Error("Status is required");

			// If all validations pass, call the next middleware
			next();
		} catch (error) {
			// If any validation fails, throw an error with a specific error message and status code
			throw { error: error.message, errorCode: 400 };
		}
	}
};

// Export the validateUpdateTaskInputs function
module.exports = { validateUpdateTaskInputs };