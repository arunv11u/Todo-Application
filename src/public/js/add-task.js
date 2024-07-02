// Import necessary functions and classes from task.js module
import {
	Task,
	validateTaskName,
	validateTaskDescription,
	validateTaskPriority,
	validateTaskDate,
	formatDate
} from "./task.js";

// Function to reset the add task form fields
function resetAddTaskForm() {
	$("#name").val("");
	$("#description").val("");
	$("#priority").val("");
	$("#date").val("");
}

// jQuery ready function
$(() => {

	$("#date").prop("min", formatDate(new Date()));

	// Event listener for input on task name field
	$("#name").on("input", () => {
		try {
			validateTaskName($("#name").val());
			$("#name-error").css("display", "none");
		} catch (error) {
			$("#name-error").css("display", "block").text(error.message);
		}
	});

	// Event listener for input on task description field
	$("#description").on("input", () => {
		try {
			validateTaskDescription($("#description").val());
			$("#description-error").css("display", "none").text("");
		} catch (error) {
			$("#description-error").css("display", "block").text(error.message);
		}
	});

	// Event listener for input on task priority field
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

	// Event listener for clicking on back to home page button
	$("#back-to-home-page").on("click", () => {
		location.href = `/`;
	});

	// Event listener for clicking on create task button
	$("#create-task").on("click", async () => {
		const name = $("#name").val();
		const description = $("#description").val();
		const priority = $("#priority").val();
		const date = $("#date").val();


		const task = new Task(
			name,
			description,
			priority,
			date
		);

		let isInvalidAddTaskForm = false;

		// Validate task name
		try {
			validateTaskName(name);
			$("#name-error").css("display", "none").text("");
		} catch (error) {
			isInvalidAddTaskForm = true;
			$("#name-error").css("display", "block").text(error.message);
		}

		// Validate task description
		try {
			validateTaskDescription(description);
			$("#description-error").css("display", "none").text("");
		} catch (error) {
			isInvalidAddTaskForm = true;
			$("#description-error").css("display", "block").text(error.message);
		}

		// Validate task priority
		try {
			validateTaskDate(priority);
			$("#date-error").css("display", "none").text("");
		} catch (error) {
			isInvalidAddTaskForm = true;
			$("#date-error").css("display", "block").text(error.message);
		}

		// Validate task date
		try {
			validateTaskPriority(priority);
			$("#priority-error").css("display", "none").text("");
		} catch (error) {
			isInvalidAddTaskForm = true;
			$("#priority-error").css("display", "block").text(error.message);
		}

		// If any form validation fails, return without creating task
		if (isInvalidAddTaskForm) return;

		// Create the task
		await task.create();

		$("#task_added_msg")
			.html(`<div class="alert-msg"><p>task added successfully!</p>
			<a href="/">show added task </a></div>`).show();

		setInterval(() => { $("#task_added_msg").hide() }, 1000);

		// Reset the add task form fields
		resetAddTaskForm();
	});
});
