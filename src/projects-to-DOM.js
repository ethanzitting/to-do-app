import { $ } from './$-file.js';
import { makeElement } from './make-element.js';

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

export {loadProjectsToDOM}