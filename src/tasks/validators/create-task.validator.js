
// Validation middleware function for creating a task
const validateCreateTaskInputs = () => {
	// Return a middleware function to validate request inputs
	return function (request, response, next) {
		try {
			// Check if task name is provided
			if (!request.body.name)
				throw new Error("Activity name is required");

			// Check if task description is provided
			if (!request.body.description)
				throw new Error("Activity description is required");

			// Check if task priority is provided
			if (!request.body.priority)
				throw new Error("Activity priority is required");

			// Check if date is provided
			if (!request.body.date)
				throw new Error("Activity date is required");

			// If all validations pass, call the next middleware
			next();
		} catch (error) {
			// If any validation fails, throw an error with a specific error message and status code
			throw { error: error.message, errorCode: 400 };
		}
	}
};

// Export the validateCreateTaskInputs function
module.exports = { validateCreateTaskInputs };