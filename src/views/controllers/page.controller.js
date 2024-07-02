const express = require("express");

// Create a router instance
const router = express.Router();

/**
 * Route to render the index page.
 */
router.get("/", async (request, response, next) => {
	try {
		return response.render("index");
	} catch (error) {
		console.log(error);
		throw error;
	}
});

/**
 * Route to render the add task page.
 */
router.get("/add-task", async (request, response, next) => {
	try {
		return response.render("add-task");
	} catch (error) {
		console.log(error);
		throw error;
	}
});

/**
 * Route to render the edit task page.
 */
router.get("/edit-task", async (request, response, next) => {
	try {
		return response.render("edit-task");
	} catch (error) {
		console.log(error);
		throw error;
	}
});

// Export the router
module.exports = router;