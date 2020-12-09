/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

// CONCATENATED MODULE: ./src/make-element.js
const makeElement = (elementType, parentId, childId, htmlToUse, referenceChild) => {
	const parent = document.querySelector(`${parentId}`);
	const child = document.createElement(`${elementType}`);
	child.setAttribute("id", `${childId}`);
	htmlToUse = htmlToUse || "";
	child.innerHTML = htmlToUse;

	// Default is put it last, otherwise, put it after the included child's ID
	referenceChild = referenceChild || "after";
	if (referenceChild == "after") {
		parent.appendChild(child);
	} else {
		referenceChild = document.querySelector(referenceChild);
		parent.insertBefore(child, referenceChild);
	}	
}


// CONCATENATED MODULE: ./src/load-page.js
;


const loadPage = (() => {

	// Loads Header
	const loadHeader = () => {
		makeElement("div", "header", "header-home", `<h1><a href="">To-Do App</a></h1>`);
		makeElement("div", "header", "header-more", `<h1><a href="https://www.ethanzitting.com/">More by Ethan</a></h1>`);
	};
	loadHeader();


	// Loads Footer
	const loadFooter = () => {
		makeElement("div", "footer", "footer-github", `<h3><a href="">GitHub</a></h3>`);
		makeElement("div", "footer", "footer-linkedin", `<h3><a href="">LinkedIn</a></h3>`);
		makeElement("div", "footer", "footer-copywrite", `<h3><a href="">© 2020</a></h3>`);
	};
	loadFooter();


	// Loads Body
	const loadProjectPanel =  () => {
		
		// Builds Cosmetic Project Title Bar
		makeElement("div", "main", "title-bar", `<h1>Projects</h1>`);
	
		// Builds project container div.
		makeElement("section", "main", "projectContainer");
	
		// Builds addProject button.
		makeElement("div", "#projectContainer", "add-project-button", "&#65291 Add Project");
	}
	loadProjectPanel();
});



// CONCATENATED MODULE: ./src/$-file.js
function $(element) {
	element = document.getElementById(element);
return element;
}


// CONCATENATED MODULE: ./src/script.js
// Import Modules
;




let projectArray = [
	
];

const projectFactory = () => {
	// Activated when a new tab needs to be created.
	let id = 0;
	let title = "";
	let description = "";
	let taskArray = [];

	return {  id, title, description, taskArray };
}

projectArray[0] = projectFactory();
projectArray[0].title = "Example Project";
projectArray[0].description = "Example Project Description";


loadPage();


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
		let objectStore = db.createObjectStore('projects', {keyPath: 'id', autoIncrement:true});

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


let loadProjectsToDOM = () => {
	const projectContainer = $("projectContainer");

	projectArray.forEach(project => {
		makeElement("div", "#projectContainer", `project-${project.id}`, `
			<h1>${project.title}</h1>
			<p>${project.description}</p>
		`);

		const projectDiv = $(`project-${project.id}`);
		projectDiv.setAttribute("class", "project-div");

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




/******/ })()
;