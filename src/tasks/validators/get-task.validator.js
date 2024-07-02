

// Validation middleware function for retrieving a task
const validateGetTaskInputs = () => {
	// Return a middleware function to validate request inputs
	return function (request, response, next) {
		try {
			// Check if task ID is provided in request parameters
			if (!request.params.id)
				throw new Error("Task id is required");

			// If task ID is provided, call the next middleware
			next();
		} catch (error) {
			// If validation fails, throw an error with a specific error message and status code
			throw { error: error.message, errorCode: 400 };
		}
	}
};

// Export the validateGetTaskInputs function
module.exports = { validateGetTaskInputs };