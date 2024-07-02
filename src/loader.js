// Importing required modules
const routes = require("./routes");
const { unhandledErrorHandler } = require("./utils");


// Function to load modules and set up the application
async function load(app) {
	// Handle uncaught exceptions and unhandled rejections
	unhandledErrorHandler();

	// Set up routes by listening on the Express app
	routes.listen(app);
}

// Export the load function
module.exports = { load };