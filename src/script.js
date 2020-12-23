// Import Modules
import { loadPage } from './load-page.js';
import { getProjectId } from './get-project-id';
import { loadProjectsFromDatabase } from './load-projects-from-database';
import { loadProjectsToDOM } from './projects-to-DOM';
import { $ } from './$-file';
import { makeElement } from './make-element.js';
import { saveProjectToDatabase } from './project-to-IDB';


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





