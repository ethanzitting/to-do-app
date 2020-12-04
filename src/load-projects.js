import {  makeElement  } from './make-element.js';

// $() almost always means document.getElementById()

// Constants for editing the DOM
const projectContainer = document.querySelector("#projectContainer")
const addProjectButton = document.querySelector("#add-project-button");

// Variables to be used by the program
let db;


const loadProjects = () => {

	// Code related to indexedDB is heavily influenced by https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
	// I think this initializes the DB
	let request = window.indexedDB.open('projects_db', 1);

	// This is a simple error handler.
	request.onerror = () => {
		console.log('Database failed to open.');
	}

	// If it opens successfully, log it and display the results.
	request.onsuccess = () => {
		console.log('Database opened successfully');

		db = request.result;

		displayProjects();
	}

	// This sets up the database table if it hasn't already been done.
	request.onupgradeneeded = (e) => {
		// Grabs a reference to the opened database
		let db = e.target.result;

		// Creates the table to store in the database. ID autoincrements.
		let objectStore = db.createObjectStore('projects_os', {keyPath: 'id', autoIncrement: true});

		console.log("Database setup complete");
	}
}

// form.onsubmit = addData;

function saveData(e) {
	let newItem = projectFactory();
}


// Initialize the function factory and store the output in project.
		// var project = projectFactory();
// var addRequest = store.add(project);
		// request.onsuccess = (e) {
			// console.log("New Project added to DB");
		// }





const projectFactory = () => {
	
	// Activated when a new tab needs to be created.
	const projectId = `project${newProjectId}`;
	let title = "";
	let description = "";
	let taskArray = [];
	
	const taskFactory = () => {
		// Activated when a new task is created. Again, a simple click, 
		// no immediate data input from user.
		let taskText = "";
		let taskCompleted = false;
	
		// There has to be DOM manipulation in here for adding, removing, and editing tasks.

		return {  taskText, taskCompleted  };
	}

	// There has to be DOM manipulation in here for adding, removing, and editing tabs


	return {  tabId, title, description, taskArray, taskFactory  };
}

/*

// Adds tabs in array to DOM
const loadTabs = (tabArray) => {
	console.log("Inside loadTabs()");
	console.log(`  tabArray.length: ${tabArray.length}`);

	// Load addTabButton
	makeElement("div", "#tabContainer", "addTabButton", "&#65291 Add Project");
	const addTabButton = document.querySelector("#addTabButton");
	addTabButton.addEventListener('click', () => {
		addTab();
	});

	// If tabArray holds anything, load it...
	if (tabArray.length > 0) {
		for (let i = 0; i < tabArray.length; i++) {
			addTabToDOM(tabArray[i]);
		}
	}
}

// Constructs the tab in the DOM
const addTabToDOM = (tabObject) => {
	console.log("Inside addTabToDOM");
	// Builds tab card
	makeElement("div", "#tabContainer", `${tabObject.tabId}`, "", "#addTabButton");
	makeElement("div", `#${tabObject.tabId}`, `${tabObject.tabId}Title`, "<h1>Project Title</h1>");
	const titleDiv = document.querySelector(`#${tabObject.tabId}Title`);
	titleDiv.setAttribute("class", "tabTitleDiv");
	
	makeElement("div", `#${tabObject.tabId}`, `${tabObject.tabId}Description`, "<p>Project Description</p>");
	makeElement("div", `#${tabObject.tabId}`, `${tabObject.tabId}TaskContainer`);

	// Builds addTaskButton
	makeElement("div", `#${tabObject.tabId}`, `${tabObject.tabId}addTaskButton`, "&#65291 Add Task");
	const addTaskButton = document.querySelector(`#${tabObject.tabId}addTaskButton`);
	addTaskButton.setAttribute("class", "addTaskButton");
	addTaskButton.addEventListener('click', () => {
		addTask(tabObject);
	});

	document.getElementById(tabObject.tabId).setAttribute('class', 'tabDiv');

}

const addTasksToDOM = (tabObject) => {
	console.log(tabObject);
}

const addTask = (tabObject) => {
	console.log("Adding Task...");
	makeElement("div", `#${tabObject.tabId}TaskContainer`, `${tabObject.tabId}TaskContainer`, `<form><input type="checkbox" id="${tabObject.tabId}Task1" name="${tabObject.tabId}Task1" value="complete"><label for="${tabObject.tabId}Task1">Task1</label><br>`);
}


// So this is the factory. I don't think the means for using the factory should
// be inside the factory. See addTab()
const tabFactory = (newTabId) => {
	// Activated when a new tab needs to be created.
	const tabId = `tab${newTabId}`;
	let title = "";
	let description = "";
	let taskArray = [];
	
	const taskFactory = (tabId) => {
		// Activated when a new task is created. Again, a simple click, 
		// no immediate data input from user.
		let taskText = "";
		let taskCompleted = false;
	
		// There has to be DOM manipulation in here for adding, removing, and editing tasks.

		return {  taskText, taskCompleted  };
	}

	// There has to be DOM manipulation in here for adding, removing, and editing tabs


	return {  tabId, title, description, taskArray, taskFactory  };
}


const addTab = () => {
	let newTab = tabFactory(newTabId);
	newTabId++
	tabArray.push(newTab);
	console.log(tabArray);
	addTabToDOM(newTab);
}

*/

export {
	loadProjects
}
