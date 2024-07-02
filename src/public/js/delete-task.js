// Importing the Task class from the task.js file
import { Task } from "./task.js";

// jQuery ready function
$(() => {
	// Event listener for the delete task button
	$("#delete-task").on("click", () => {
		// Displays the modal by setting its display property to flex
		$("#modal").css("display", "flex");
	});

	// Event listener for the cancel button in the modal
	$("#modal-cancel-task-deletion").on("click", () => $("#modal").css("display", "none"));

	// Getting the task ID from the URL query parameters
	const url = new URL(location.href);
	const searchParams = new URLSearchParams(url.search);
	const id = parseInt(searchParams.get("id"));

	// Event listener for the confirm deletion button in the modal
	$("#modal-delete-task").on("click", async () => {
		// Creating a new Task instance
		const task = new Task;
		// Deleting the task with the given ID
		await task.delete(id);

		// Redirecting the user to the index.html page after deletion
		location.href = "/";
	});
});