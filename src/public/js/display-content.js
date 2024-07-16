const english = {
	title: "To-do App",
	userManual: "User Manual",
	myActivities: "My Activities",
	filterByDate: "Filter by date",
	add: "Add",
	sNo: "S.No",
	date: "Date",
	activity: "Activity",
	description: "Description",
	priority: "Priority",
	low: "Low",
	medium: "Medium",
	high: "High",
	status: "Status",
	pending: "Pending",
	done: "Done",
	actions: "Actions",
	selectAPriority: "Select a priority",
	back: "Back",
	create: "Create",
	edit: "Edit",
	delete: "Delete",
	update: "Update"
};

const french = {
	title: "Application de tâches",
	userManual: "Manuel de l'Utilisateur",
	myActivities: "Mes activités",
	filterByDate: "Filtrer par date",
	add: "Ajouter",
	sNo: "S.No",
	date: "Date",
	activity: "Activité",
	description: "Description",
	priority: "Priorité",
	low: "Faible",
	medium: "Moyen",
	high: "Haut",
	status: "Statut",
	pending: "En attente",
	done: "Fait",
	actions: "Actions",
	selectAPriority: "Sélectionnez une priorité",
	back: "Dos",
	create: "Créer",
	edit: "Modifier",
	delete: "Supprimer",
	update: "Mise à jour"
};

function getDisplayContent(language, key) {
	if(language === "english") return english[key];

	return french[key];
}

export {
	getDisplayContent
};