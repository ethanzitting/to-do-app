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
	console.log(`loadPage() started`);

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

	console.log(`loadPage() finished`);
});




// CONCATENATED MODULE: ./src/get-project-id.js
// Accesses cookie to return lowest open ID.
let getProjectId = () => {

	// Global variable for containing the returned ID.
	let newProjectId;

	// Global variale for 2 years from now.
	let expirationDate = new Date();
	expirationDate.setFullYear(expirationDate.getFullYear() + 2);

	// If a cookie is present...
	if (document.cookie) {
		console.log(`Cookie found: ${document.cookie}`);

		// If removing all non-number characters from the cookie returns anything,
		// There must be an ID present

		if (document.cookie.replace(/^\D+/g, '')) {
			console.log(`Cookie contains an Id: ${document.cookie.replace(/^\D+/g, '')}`)
		
			// Assign the ID to a variable.
			newProjectId = Number(document.cookie.replace(/^\D+/g, ''));
			console.log(`Id of ${newProjectId} retreived. Updating cookie Id.`);
			
			// Update the expiration date of the cookie for 2 more years.
	
			// Increment the cookie.
			document.cookie = `openId=${newProjectId + 1}; expires=${expirationDate}`;
		
			// Check to make sure the cookie incremented.
			if (Number(document.cookie.replace(/^\D+/g, '')) == newProjectId + 1) {
				console.log(`Cookie successfully set to ${document.cookie.replace(/^\D+/g, '')}`)
			} else {
				console.log(`Error incrementing cookie.`);
			}

		}

	} else {
		console.log(`Cookie not found. Setting initial cookie.`);
	
		// Create an expiration date 2 years in the future for the first cookie.
		document.cookie = `openId=0; expires=${expirationDate}`;
		newProjectId = 0;
	
		// Now if a cookie is preset...
		if (document.cookie) {
			console.log(`Cookie successfully started at: ${document.cookie}`);
		} else {
			console.log(`Error setting initial cookie`);
		}

		// Assign the ID to a variable.
		newProjectId = Number(document.cookie.replace(/^\D+/g, ''));
		console.log(`Id of ${newProjectId} retreived. Updating cookie Id.`);
		
	
		// Increment the cookie.
		document.cookie = `openId=${newProjectId + 1}; expires=${expirationDate}`;
	
		// Check to make sure the cookie incremented.
		if (Number(document.cookie.replace(/^\D+/g, '')) == newProjectId + 1) {
			console.log(`Cookie successfully set to ${document.cookie.replace(/^\D+/g, '')}`)
		} else {
			console.log(`Error incrementing cookie.`);
		}
	}

	return newProjectId;
};


// CONCATENATED MODULE: ./src/load-projects-from-database.js
function loadProjectsFromDatabase() {
	console.log(`loadProjectsFromDatabase() started`);
	// Global scope variable for storing the DB.
	let db;
	let projectArray = [];


	// Checks that window has indexedDB capabilities.
	if (!window.indexedDB) {alert("Your browser is not supported.")};

	// Does the actual DB initialization
	let request = window.indexedDB.open('projectDatabase', 1);


	// First Time and edition change handler
	request.onupgradeneeded = e => {

		// Assigns the database to db
		db = e.target.result;

		// Create an object store named projects, or retrieve it if it already exists.
		let projects;
		if (!db.objectStoreNames.contains('projects')) {
			projects = db.createObjectStore('projects', {keyPath: "id"})
		} else {
			projects = request.transaction.objectStore('projects');
		}

		/* I don't think I need this code, as the projects should be 
		    already searchable by ID.
			if (!projects.indexNames.contains('id')) {
				projects.createIndex('id', 'id');
			}
		*/

		console.log("Database setup complete");
	}


	// Error Handler
	request.onerror = e => {console.log(`Database failed to open. Error Code: ${e.target.errorCode}`)};


	// Success Handler and actual meat of this function
	request.onsuccess = e => {
		console.log('Database opened successfully.');
	
		// Assigns the databse to db
		db = e.target.result;
	
		// Opens transaction
		let tx = db.transaction(['projects'], 'readonly');

		// pulls data stored in objectStore
		let store = tx.objectStore('projects');

		// Opens cursor to iterate through data
		store.openCursor().onsuccess = e => {
			// Assigns resulting cursor to a variable
			var cursor = e.target.result;

			// If the cursor contains an item...
			if (cursor) {
				// Push the cursor's content onto the projectArray variable
				projectArray.push(cursor.value);
				console.log(cursor.value);
				cursor.continue();
			}
		}
	}
	
	console.log(`loadProjectsFromDatabase() finished`);
	return projectArray;
}



// CONCATENATED MODULE: ./src/$-file.js
function $(element) {
	element = document.getElementById(element);
return element;
}


// CONCATENATED MODULE: ./src/projects-to-DOM.js
;


let loadProjectsToDOM = (projectArray) => {
	console.log("loadProjectsToDOM fired.");
	console.log(projectArray);

	projectArray.forEach(project => {
		console.log(`projectFound: ${project.id}`);
		// Code generating the Title and Description HTML
		makeElement("div", "#projectContainer", `project-${project.id}`, `<h1>${project.title}</h1><p>${project.description}</p>`, "#add-project-button");

		const projectDiv = $(`project-${project.id}`);
		projectDiv.setAttribute("class", "project-div");


		// Code generating the task HTML
		let taskHTML = "";

		for (let i = 0; i < project.taskArray.length; i++) {
			console.log(project.taskArray[i]);
			let task = project.taskArray[i];
			
			if (task.completed) {
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
		
	});

	console.log(`loadProjectToDOM() finished`);
};


// CONCATENATED MODULE: ./src/project-to-IDB.js
function saveProjectToDatabase(project) {
	// Global scope variable for storing the DB.
	let db;


	// Checks that window has indexedDB capabilities.
	if (!window.indexedDB) {alert("Your browser is not supported.")};

	// Does the actual DB initialization
	let request = window.indexedDB.open('projectDatabase', 1);


	// First Time and edition change handler
	request.onupgradeneeded = e => {

		// Assigns the database to db
		db = e.target.result;

		// Create an object store named projects, or retrieve it if it already exists.
		let projects;
		if (!db.objectStoreNames.contains('projects')) {
			projects = db.createObjectStore('projects', {keyPath: "id"})
		} else {
			projects = request.transaction.objectStore('projects');
		}

		/* I don't think I need this code, as the projects should be 
		    already searchable by ID.
			if (!projects.indexNames.contains('id')) {
				projects.createIndex('id', 'id');
			}
		*/

		console.log("Database setup complete");
	}


	// Error Handler
	request.onerror = e => {console.log(`Database failed to open. Error Code: ${e.target.errorCode}`)};


	// Success Handler and actual meat of this function
	request.onsuccess = e => {
		console.log('Database opened successfully.');
	
		// Assigns the databse to db
		db = e.target.result;
	
		// Opens transaction
		let tx = db.transaction(['projects'], 'readwrite');

		// pulls data stored in objectStore
		let store = tx.objectStore('projects');

		// Opens cursor to iterate through data
		store.add(project);

		// Check for transaction results.
		tx.oncomplete = function() {console.log("project stored")}
		tx.onerror = e => {console.log('erorr storing project ' + e.target.errorCode)};
	}
}



// CONCATENATED MODULE: ./src/script.js
// Import Modules
;








// Factory for making new project objects
const projectFactory = () => {
	let id = getProjectId();
	let title = "Add Title";
	let description = "Add Description";
	let taskArray = [];
	let favorite = false;

	return { id, title, description, taskArray, favorite };
}


// Factory for making new project tasks
const taskFactory = () => {
	let text = "";
	let completed = false;

	return {  text, completed  };
};


/* Builds basic page framework for next functions to work with */
loadPage();


// Pulls existing projects from IDB
let projectArray = loadProjectsFromDatabase();


setTimeout(() => {
	loadProjectsToDOM(projectArray);
}, 500);



// Power the add-project-button to create and display a new project
const addProjBtn = $("add-project-button");
addProjBtn.addEventListener('click', () => {
	// On-click, create a new project.
	createProject();
});


// Creates a new, bare project in the DOM, program, and database.
let createProject = () => {
	// Create Bare Project in DOM
	let newProject = projectFactory();
	console.log(`createProject actives projectFactory(). Result:`);
	console.log(`id: ${newProject.id}, title: ${newProject.title}, description: ${newProject.description}`)
	
	makeElement('div', '#projectContainer', `project${newProject.id}`, ``, '#add-project-button');
	let projectElement = $(`project${newProject.id}`);
	
	projectElement.innerHTML = `<h1>${newProject.title}</h1>
	<p>${newProject.description}</p>
	<button id="save${newProject.id}"'>Save</button>`;

	// When save button is pressed, save project in database.
	const saveBtn = $(`save${newProject.id}`);
	saveBtn.addEventListener('click', () => {
		saveProjectToDatabase(newProject);
		saveBtn.parentNode.removeChild(saveBtn);
	});
}






/******/ })()
;