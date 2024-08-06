// Import necessary functions and classes from task.js module
import {
	Task,
	validateTaskName,
	validateTaskDescription,
	validateTaskPriority,
	validateTaskDate,
	formatDate
} from "./task.js";

import { getDisplayContent } from "./display-content.js";

// Function to reset the add task form fields
function resetAddTaskForm() {
	$("#name").val("");
	$("#description").val("");
	$("#priority").val("");
	$("#date").val("");
}

// jQuery ready function
$(() => {

	const language = localStorage.getItem("language");

	$("#title").text(getDisplayContent(language, "title"));
	$("#add").text(getDisplayContent(language, "add"));
	$("#date-txt").text(getDisplayContent(language, "date"));
	$("#activity-txt").text(getDisplayContent(language, "activity"));
	$("#description-txt").text(getDisplayContent(language, "description"));
	$("#priority-txt").text(getDisplayContent(language, "priority"));
	$("#back").text(getDisplayContent(language, "back"));
	$("#create").text(getDisplayContent(language, "create"));
	$("#select-a-priority").text(getDisplayContent(language, "selectAPriority"));
	$("#low").text(getDisplayContent(language, "low"));
	$("#medium").text(getDisplayContent(language, "medium"));
	$("#high").text(getDisplayContent(language, "high"));

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

		const [year, month, day] = date.split("-");

		const activityDate = new Date(
			parseInt(year),
			parseInt(month) - 1,
			parseInt(day),
			new Date().getHours(),
			new Date().getMinutes(),
			new Date().getSeconds(),
			new Date().getMilliseconds()
		);

		const task = new Task(
			name,
			description,
			priority,
			activityDate,
			"PENDING"
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

		const language = localStorage.getItem("language");

		if (language === "english") $("#task_added_msg")
			.html(`<div class="alert-msg"><p>task added successfully!</p>
			<a href="/">show added task</a></div>`).show();
		else $("#task_added_msg")
			.html(`<div class="alert-msg"><p>tâche ajoutée avec succès !</p>
			<a href="/">afficher la tâche ajoutée</a></div>`).show();

		setInterval(() => { $("#task_added_msg").hide() }, 1000);

		// Reset the add task form fields
		resetAddTaskForm();
	});
});
