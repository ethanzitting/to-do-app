// Import Modules
import { loadPage } from './load-page.js';
import { $ } from './$-file.js';
import { makeElement } from './make-element.js';


let projectArray = [
	
];

let currentProjectId = 0;


// Handles cookie conataining running ID for projects
if (document.cookie.replace(/^\D+/g, '')) {
	currentProjectId = document.cookie.replace(/^\D+/g, '');
	console.log(`currentProjectId: ${currentProjectId}`);
}



const projectFactory = (currentProjectId) => {
	let id = currentProjectId;
	console.log(`inside projectFactory. currentProjectId: ${currentProjectId}`);
	currentProjectId++;
	console.log(`projectFactory fired. New currentProjectId: ${currentProjectId}`);
	document.cookie = `id=${currentProjectId}`;

	let title = "";
	let description = "";
	let taskArray = [];

	return { id, title, description, taskArray };
}




const taskFactory = () => {
	let taskText = "";
	let taskCompleted = false;

	return {  taskText, taskCompleted  };
};


/* for debugging */
projectArray.push(projectFactory(currentProjectId));
projectArray.push(projectFactory(currentProjectId));
console.log(projectArray);


/* Builds basic page framework for next functions to work with */
loadPage();


/* Establishes a connection to the IDB, pulling the projects there to this program */
const loadProjectsFromDB = () => {
	// Global scope variable for storing the DB.
  let db;


	// Initializes the DB.
	if (!window.indexedDB) {alert("Try again on a different browser.")};
	let request = window.indexedDB.open('myDatabase', 1);

	// Error handler.
	request.onerror = e => {console.log('Database failed to open. Error Code: ' + e.target.errorCode)};

	// Handles first open and version changes.
	request.onupgradeneeded = e => {
		console.log("Inside request.onupgradeneeded");
		let db = e.target.result;

		// Creates the table to store in the database. ID autoincrements.
		let objectStore = db.createObjectStore('projects', { keyPath: "id", autoIncrement:true });
		let idStore = db.createObjectStore('idStore', {keyPath: "name"});

		console.log("Database setup complete");
	}

	// If it opens successfully, log it and display the results.
	request.onsuccess = () => {
		console.log('Database opened successfully');

		db = request.result;

		storeProjectsInProjectArray();
	}

	// At page load, access and store all projects stored in DB
	function storeProjectsInProjectArray() {
		// Open transaction
		let displayTrans = db.transaction(['projects']);
		// Make objectStore accessible
		let objectStore = displayTrans.objectStore("projects");
		// Create a cursor and loop through the projects in the objectStore
		objectStore.openCursor().onsuccess = e => {
			var cursor = e.target.result;
			if (cursor) {
				projectArray.push(cursor.value);
				cursor.continue();
			}
		}

		displayTrans.oncomplete = e => {console.log("Projects pulled from database.")};
	}
}

loadProjectsFromDB();


// This function takes the projects from projectArray[] and creates
	// DOM elements for them
let loadProjectsToDOM = () => {
	const projectContainer = $("projectContainer");

	projectArray.forEach(project => {
		// Code generating the Title and Description HTML
		makeElement("div", "#projectContainer", `project-${project.id}`, `<h1>${project.title}</h1><p>${project.description}</p>`, "#add-project-button");

		const projectDiv = $(`project-${project.id}`);
		projectDiv.setAttribute("class", "project-div");


		// Code generating the task HTML
		let taskHTML = "";

		for (let i = 0; i < project.taskArray.length; i++) {
			console.log(project.taskArray[i]);
			let task = project.taskArray[i];
			
			if (task.isCompleted) {
				taskHTML += `<input type="checkbox" name="task-${i}" id="project-${project.id}-task-${i}" checked="true">
				<label for="task-${i}">${task.text}<br>`;
			} else {
				taskHTML += `
				<input type="checkbox" name="task-${i}">
				<label for="task-${i}">${task.text}<br>`;
			}
		}
		taskHTML += `&#65291 Add Task`;
		projectDiv.innerHTML += taskHTML;
		
		console.log(project);
	});
};

setTimeout(() => {
	loadProjectsToDOM();
}, 1000);





/* Needs to be rethought. I can't have functions inside the objects that
	get stored in the database.
const taskFactory = () => {
	// Activated when a new task is created. Again, a simple click, 
	// no immediate data input from user.
	let taskText = "";
	let taskCompleted = false;

	return {  taskId, taskText, taskCompleted  };
};
*/
/* Storage for code related to adding new projects

const addProjectButton = $("add-project-button");
	console.log(addProjectButton);

addProjectButton.addEventListener('click', () => {
		console.log("addProjectButton pressed.");
		saveNewEntry();
	});
	
	// This fires on button click adding a new, base project for 
		// the user to populate.
	function saveNewEntry(e) {
		console.log("Inside saveNewEntry();");
		
		// Create the new, empty project to add to the DB.
		let newProject = projectFactory();
		console.log(typeof(newProject));
		console.log(newProject);
	
		console.log("Attempting to add new project...");
		let newEntryTrans = db.transaction(['projects'], 'readwrite');
		
		let objectStore = newEntryTrans.objectStore('projects');
	
		let request = objectStore.put(newProject);
	
		request.onerror = e => {
			console.log("Error adding new transaction. Code: " + e.target.errorCode);
		}
	
		newEntryTrans.oncomplete = e => {
			console.log("New Project added to IDB");
		}
	}

*/



