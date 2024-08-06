// Importing Task class from task.js
import { getDisplayContent } from "./display-content.js";
import { Task, formatDate } from "./task.js";

// jQuery document ready function
$(async () => {
	$("#language-toggle").on("change", function () {
		let language = "english";

		if (this.checked) language = "french";

		localStorage.setItem("language", language);

		$("#title").text(getDisplayContent(language, "title"));
		$("#user-manual").text(getDisplayContent(language, "userManual"));
		$("#my-activities").text(getDisplayContent(language, "myActivities"));
		$("#filter-by-date").text(getDisplayContent(language,"filterByDate"));
		$("#add").text(getDisplayContent(language, "add"));
		$("#sNo").text(getDisplayContent(language, "sNo"));
		$("#date").text(getDisplayContent(language, "date"));
		$("#activity").text(getDisplayContent(language, "activity"));
		$("#description").text(getDisplayContent(language, "description"));
		$("#priority").text(getDisplayContent(language, "priority"));
		$("#status").text(getDisplayContent(language, "status"));
		$("#actions").text(getDisplayContent(language, "actions"));
	});

	const selectedLanguage = localStorage.getItem("language");
	if (selectedLanguage === "french") $("#language-toggle").click();

	// Event listener for clicking the "Add Task" button to navigate to add-task.html
	$("#add-task").on("click", () => (location.href = "/add-task"));

	// Retrieving all tasks
	const tasks = await Task.getAll();

	// If tasks exist, display the tasks list, otherwise show a message
	if (tasks.length) {
		$("#no-tasks").css("display", "none");
		$("#no-filtered-tasks").css("display", "none");
		$("#search-task").css("display", "flex");
		$("#todo-list").css("display", "block");
	}

	// Loop through each task and display them in the tasks table
	tasks.forEach((task, index) => {
		let description = task.description;
		// if (description.length)
		// 	description = `${task.description.substring(0, 30)}...`;

		let priorityStyle = "";
		if (task.priority === "LOW") priorityStyle = "task--low-priority";
		else if (task.priority === "MEDIUM")
			priorityStyle = "task--medium-priority";
		else priorityStyle = "task--high-priority";

		let statusStyle = "task--pending";
		if (task.status === "DONE") statusStyle = "task--success";

		// Appending each task as a row in the tasks table
		$("#tasks").append(`<tr class="task-card__task">
		<td class="task-card__task-item">${index + 1}</td>
		<td class="task-card__task-item">${formatDate(new Date(task.date))}</td>
        <td class="task-card__task-item">${task.name}</td>
        <td class="task-card__task-item task-card__task-item-description">${description}</td>
        <td class="task-card__task-item ${priorityStyle}">${task.priority}</td>
        <td class="task-card__task-item ${statusStyle}">${task.status}</td>
        <td class="task-card__task-item">
		<button onclick="editTask('${task.id}')"><i class="fa fa-pen" aria-hidden="true"></i></button>
		</td>
    </tr>`);
	});

	// Event listener for clicking the "Search" button
	$("#search-task-input").on("input", async () => {
		const searchTextInput = $("#search-task-input").val();

		// Retrieving all tasks again
		const tasks = await Task.getAll();
		let filteredTasks = [...tasks];

		if(searchTextInput) {
			// Creating a regular expression for searching tasks
			filteredTasks = tasks.filter((task) => {
				// Filtering tasks based on search input
				if (
					formatDate(task.date) === searchTextInput
				)
					return task;
			});
		}

		// Handling display based on filtered tasks
		if (filteredTasks.length) {
			$("#no-filtered-tasks").css("display", "none");
			$("#tasks").css("display", "table");

			$("#tasks").html(`<tr class="task-card__headers">
			<th class="task-card__task-header">S.No</th>
            <th class="task-card__task-header">Date</th>
            <th class="task-card__task-header">Activity</th>
            <th class="task-card__task-header">Description</th>
            <th class="task-card__task-header">Priority</th>
			<th class="task-card__task-header">Status</th>
            <th class="task-card__task-header">Actions</th>
        </tr>`);
		} else {
			$("#no-filtered-tasks").css("display", "flex");
			$("#tasks").css("display", "none");
		}

		// Loop through each filtered task and display them in the tasks table
		filteredTasks.forEach((task, index) => {
			let description = task.description;
			if (description.length)
				description = `${task.description.substring(0, 30)}...`;

			let priorityStyle = "";
			if (task.priority === "LOW") priorityStyle = "task--low-priority";
			else if (task.priority === "MEDIUM")
				priorityStyle = "task--medium-priority";
			else priorityStyle = "task--high-priority";

			let statusStyle = "task--pending";
			if (task.status === "DONE") statusStyle = "task--success";

			// Appending each filtered task as a row in the tasks table
			$("#tasks").append(`<tr class="task-card__task" >
			<td class="task-card__task-item">${index + 1}</td>
			<td class="task-card__task-item">${formatDate(task.date)}</td>
            <td class="task-card__task-item">${task.name}</td>
            <td class="task-card__task-item">${description}</td>
            <td class="task-card__task-item ${priorityStyle}">${task.priority}</td>
        	<td class="task-card__task-item ${statusStyle}">${task.status}</td>
            <td class="task-card__task-item">
			<button onclick="editTask('${task.id}')"><i class="fa fa-pen" aria-hidden="true"></i></button>
			</td>
        	</tr>`);
		});
	});

	// Get the modal
	var modal = $("#user-manual-modal");

	// Get the button that opens the modal
	var btn = $("#user-manual");

	// Get the <span> element that closes the modal
	var span = $(".close");

	// When the user clicks the button, open the modal 
	btn.click(function () {
		modal.show();
	});

	// When the user clicks on <span> (x), close the modal
	span.click(function () {
		modal.hide();
	});

	// When the user clicks anywhere outside of the modal, close it
	$(window).click(function (event) {
		if ($(event.target).is(modal)) {
			modal.hide();
		}
	});
});

// Function to navigate to edit-task.html with task id as parameter
window.editTask = (id) => {
	location.href = `/edit-task?id=${id}`;
};
