// Import necessary modules and functions from task.js file
import {
	Task,
	validateTaskName,
	validateTaskDescription,
	validateTaskPriority,
	validateTaskDate,
	formatDate
} from "./task.js";

// When the document is ready
$(async () => {
	$("#date").prop("min", formatDate(new Date()));
	
	// Extracting task ID from URL query parameter
	let url = window.location.search;
	let id = new URLSearchParams(url).get("id");

	// Retrieve task details by ID
	const task = await Task.get(id);

	console.log("formatDate(task.date) ::", formatDate(task.date));

	// Populate form fields with task details
	$("#name").val(task.name);
	$("#description").val(task.description);
	$("#priority").val(task.priority);
	$("#date").val(formatDate(task.date));

	// Event listener for name input field
	$("#name").on("input", () => {
		try {
			validateTaskName($("#name").val());
			$("#name-error").css("display", "none").text("");
		} catch (error) {
			$("#name-error").css("display", "block").text(error.message);
		}
	});

	// Event listener for description input field
	$("#description").on("input", () => {
		try {
			validateTaskDescription($("#description").val());
			$("#description-error").css("display", "none").text("");
		} catch (error) {
			$("#description-error").css("display", "block").text(error.message);
		}
	});

	// Event listener for priority input field
	$("#priority").on("input", () => {
		try {
			validateTaskPriority($("#priority").val());
			$("#priority-error").css("display", "none").text("");
		} catch (error) {
			$("#priority-error").css("display", "block").text(error.message);
		}
	});

	// Event listener for input on task date field
	$("#date").on("input", () => {
		try {
			validateTaskDate($("#date").val());
			$("#date-error").css("display", "none").text("");
		} catch (error) {
			$("#date-error").css("display", "block").text(error.message);
		}
	});

	// Event listener for update task button
	$("#update-task").on("click", async function () {
		const name = $("#name").val();
		const description = $("#description").val();
		const priority = $("#priority").val();
		const date = $("#date").val();

		// Create new task object with updated details
		const task = new Task(name, description, priority, date);

		// Variable to track if there are any validation errors
		let isInvalidAddTaskForm = false;

		// Validate name field
		try {
			validateTaskName(name);
			$("#name-error").css("display", "none").text("");
		} catch (error) {
			isInvalidAddTaskForm = true;
			$("#name-error").css("display", "block").text(error.message);
		}

		// Validate description field
		try {
			validateTaskDescription(description);
			$("#description-error").css("display", "none").text("");
		} catch (error) {
			isInvalidAddTaskForm = true;
			$("#description-error").css("display", "block").text(error.message);
		}

		// Validate priority field
		try {
			validateTaskPriority(priority);
			$("#priority-error").css("display", "none").text("");
		} catch (error) {
			isInvalidAddTaskForm = true;
			$("#priority-error").css("display", "block").text(error.message);
		}

		// Validate task priority
		try {
			validateTaskDate(date);
			$("#date-error").css("display", "none").text("");
		} catch (error) {
			isInvalidAddTaskForm = true;
			$("#date-error").css("display", "block").text(error.message);
		}

		// If there are any validation errors, return
		if (isInvalidAddTaskForm) return;

		// Update task and redirect to index page
		await task.update(id);

		location.href = "/";
	});

	// Event listener for back to home page button
	$("#back-to-home-page").on("click", () => {
		location.href = `/`;
	});
});