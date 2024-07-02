const corsModule = require("./cors");
const requestErrorHandlerModule = require("./request-error-handler");
const unhandledErrorHandlerModule = require("./unhandled-error-handler");

/**
 * Module exports combining various middleware and utility modules for easier import.
 */
module.exports = {
	...corsModule, // Export CORS-related functionality
	...requestErrorHandlerModule, // Export request error handling middleware
	...unhandledErrorHandlerModule // Export unhandled error handling middleware
};