import {  makeElement  } from './make-element.js';


// Establish starting variables and project array that will hold projects.
// Use projects instead of projects for syntactic clarity.
const projectArray = [];
let newProjectId = 0;


// Obviously the starting variables and project array will be determined by
// cookies on the users computer.


// Load the basic body setup, a title and then a section for the project projects.
const loadProjectPanel =  () => {

	console.log("Inside loadProjectPanel()");

	// Builds Cosmetic Project Title Bar
	makeElement("div", "main", "titleBar", `<h1>Projects</h1>`);

	// Builds project container div.
	makeElement("section", "main", "projectContainer");

	// Builds addProject button.
	makeElement("div", "#projectContainer", "addProjectButton", "&#65291 Add Project");
}

loadProjectPanel();


// Establish Functionality for the Add Project and Add Task buttons.

// This creates the projects and tasks in the project only
const projectFactory = (newProjectId) => {

	// Activated when a new project needs to be created.
	const projectId = `project${newProjectId}`;
	let title = "";
	let description = "";
	let taskArray = [];
	

	const taskFactory = (projectId) => {
		// Activated when a new task is created. Again, a simple click, 
		// no immediate data input from user.
		let taskText = "";
		let taskCompleted = false;

		const toggle = () => {
			taskCompleted = !taskCompleted;
		};
	
		// There has to be DOM manipulation in here for adding, removing, and editing tasks.

		return {  taskText, taskCompleted, toggle  };
	}

	// There has to be DOM manipulation in here for adding, removing, and editing projects


	return {  projectId, title, description, taskArray, taskFactory  };
}

// This adds the projects and tasks to the DOM
const addProjectToDOM = (projectObject) => {

	console.log("Inside addProjectToDOM");

	// Builds project card
	makeElement("div", "#projectContainer", `${projectObject.projectId}`, "", "#addProjectButton");
	makeElement("div", `#${projectObject.projectId}`, `${projectObject.projectId}Title`, "<h1>Project Title</h1>");
	makeElement("div", `#${projectObject.projectId}`, `${projectObject.projectId}Description`, "<p>Project Description</p>");
	makeElement("div", `#${projectObject.projectId}`, `${projectObject.projectId}TaskContainer`);


	// Builds addTaskButton
	makeElement("div", `#${projectObject.projectId}`, `${projectObject.projectId}addTaskButton`, "&#65291 Add Task");
	
	const addTaskButton = document.querySelector(`#${projectObject.projectId}addTaskButton`);
	
	ddTaskButton.setAttribute("class", "addTaskButton");
	
	addTaskButton.addEventListener('click', () => {

		addTask(projectObject);

	});

	document.getElementById(projectObject.projectId).setAttribute('class', 'projectDiv');

}

// Make Fields ediprojectle and save input to project array which saves to cookies.

// Load to DOM any projects and their tasks that exist in the project array.