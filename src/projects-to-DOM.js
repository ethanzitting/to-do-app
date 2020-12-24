import { $ } from './$-file.js';
import { makeElement } from './make-element.js';
import { updateProjectInIDB } from './update-project-in-IDB';
import { dbInit } from './db-init';

let loadProjectsToDOM = (projectArray) => {
	console.log("loadProjectsToDOM fired.");
	console.log(projectArray);

	projectArray.forEach(project => {
		// Primary Project Container Div
		makeElement("div", "#projectContainer", `project-${project.id}`, '', "#add-project-button");
		const projectDiv = $(`project-${project.id}`);
		projectDiv.setAttribute("class", "project-div");


		// Create the title div, the title h1, an the edit button
		let titleDivHTML = `<h1 id="project-${project.id}-title">${project.title}</h1>
										<button id="project-${project.id}-title-edit"><span class="material-icons">border_color</span></button><button id="project-${project.id}-delete"><span class="material-icons task-span">delete</span></button>`
		makeElement("div", `#project-${project.id}`, `project-${project.id}-title-div`, titleDivHTML);
		$(`project-${project.id}-title-div`).setAttribute("class", "title-div");

		const title = $(`project-${project.id}-title`);
		const titleEdit = $(`project-${project.id}-title-edit`);
		const projectDelete = $(`project-${project.id}-delete`);

		
		// Changes the edit icon, makes the title editable, and powers the save button
		let editTitle = () => {
			titleEdit.innerHTML = `<span class="material-icons">save</span>`;
			titleEdit.addEventListener('click', saveTitle);

			// Focuses user on now editable title field.
			title.setAttribute('contenteditable', true);
			title.focus();
		}


		// Changes the save icon, saves the new title to the database, and resets the edit button.
		let saveTitle = () => {
			// Save New Title to app
			project.title = title.innerHTML;

			// Save new title to database;
			updateProjectInIDB(project);

			// Change icon back to edit and make content static
			title.setAttribute('contenteditable', false);
			titleEdit.innerHTML = `<span class="material-icons">border_color</span>`;
			titleEdit.removeEventListener('click', saveTitle);
			titleEdit.addEventListener('click', editTitle);
		}

		// Changes edit icon to save icon and powers its functionality
		titleEdit.addEventListener('click', editTitle);

		// Powers the delete functionality for the whole project
		projectDelete.addEventListener('click', () => {
			// Update Program
			// Find index of this project in the project array
			let arrayIndex;
			

			for (let i = 0; i < projectArray.lengthp; i++) {
				if (projectArray[i].id == project.id) {
					arrayIndex = i;
					break;
				}
			}

			projectArray.splice(arrayIndex, 1);

			// Update Database
			let projectId = project.id;
			let databaseCommand = (objectStore) => {
				objectStore.delete(project.id);
			};
			
			dbInit(databaseCommand);

			// Update DOM
			$(`project-${project.id}`).remove();
		});


		// Create the description div, the description p, and the edit button
		let descriptionDivHTML = `<p id="project-${project.id}-description">${project.description}</p>
												<button id="project-${project.id}-description-edit"><span class="material-icons md-16">border_color</span></button>`
		makeElement("div", `#project-${project.id}`, `project-${project.id}-description-div`, descriptionDivHTML);
		$(`project-${project.id}-description-div`).setAttribute("class", "description-div");

		
		const description = document.querySelector(`#project-${project.id}-description`);
		const descriptionEdit = document.querySelector(`#project-${project.id}-description-edit`);


		// Changes the edit icon, makes the description editable, and powers the save button
		let editDescription = () => {
			descriptionEdit.innerHTML = `<span class="material-icons md-16">save</span>`;
			descriptionEdit.addEventListener('click', saveDescription);

			// Focuses user on now editable description field.
			description.setAttribute('contenteditable', true);
			description.focus();
		}


		// Changes the save icon, saves the new title to the database, and resets the edit button.
		let saveDescription = () => {
			// Save New description to app
			project.description = description.innerHTML;

			// Save new description to database;
			updateProjectInIDB(project);

			// Change icon back to edit and make content static
			description.setAttribute('contenteditable', false);
			descriptionEdit.innerHTML = `<span class="material-icons md-16">border_color</span>`;
			descriptionEdit.removeEventListener('click', saveDescription);
			descriptionEdit.addEventListener('click', editDescription);
		}

		// Changes edit icon to save icon and powers its functionality
		descriptionEdit.addEventListener('click', editDescription);



	

		makeElement("div", `#project-${project.id}`, `project-${project.id}-task-div`);

		// Code generating the task HTML
		
		let loadTasks = () => {
			const taskContainer = $(`project-${project.id}-task-div`)


			let taskHTML = "";
			for (let i = 0; i < project.taskArray.length; i++) {
				let task = project.taskArray[i];
				
				if (task.completed) {
					taskHTML += `<input type="checkbox" class="pointer" name="task-${i}" id="project-${project.id}-task-${i}-check" checked="true">
					<label for="task-${i}"><span id="project-${project.id}-task-${i}-label">${task.text}</span><span id="project-${project.id}-task-${i}-edit" class="material-icons md-12 task-span">border_color</span><span id="project-${project.id}-task-${i}-delete" class="material-icons md-12 task-span">delete</span></label><br>`;
				} else {
					taskHTML += `
					<input type="checkbox" class="pointer" id="project-${project.id}-task-${i}-check" name="task-${i}">
					<label for="task-${i}"><span id="project-${project.id}-task-${i}-label">${task.text}</span><span id="project-${project.id}-task-${i}-edit" class="material-icons md-12 task-span">border_color</span><span id="project-${project.id}-task-${i}-delete" class="material-icons md-12 task-span">delete</span></label><br>`;
				}

				setTimeout(() => {
					// Powers changing of completed status
					const checkbox = $(`project-${project.id}-task-${i}-check`);
					checkbox.addEventListener('click', () => {
						// Updates task in the program.
						 task.completed = !task.completed;
	
						 // Updates task in the database.
						 updateProjectInIDB(project);
					 });


					 // Powers editing of task text
					const taskText = $(`project-${project.id}-task-${i}-label`);
					const taskEdit = $(`project-${project.id}-task-${i}-edit`);


					// Changes the edit icon, makes the task editable, and powers the save button
					let editTask = () => {
						taskEdit.innerHTML = `<span class="material-icons md-12">save</span>`;
						taskEdit.addEventListener('click', saveTask);

						// Focuses user on now editable task field.
						taskText.setAttribute('contenteditable', true);
						taskText.focus();
					}


					// Changes the save icon, saves the new title to the database, and resets the edit button.
					let saveTask = () => {
						// Save New task to app
						project.taskArray[i].text = taskText.innerHTML;

						// Save new task to database;
						updateProjectInIDB(project);

						// Change icon back to edit and make content static
						taskText.setAttribute('contenteditable', false);
						taskEdit.innerHTML = `<span class="material-icons md-12">border_color</span>`;
						taskEdit.removeEventListener('click', saveTask);
						taskEdit.addEventListener('click', editTask);
					}

					// Changes edit icon to save icon and powers its functionality
					taskEdit.addEventListener('click', editTask);


					// Powers the delete button
					const deleteBtn = $(`project-${project.id}-task-${i}-delete`);
					deleteBtn.addEventListener('click', () => {
						// Delete Task from Project
						project.taskArray.splice(i, 1);

						$(`project-${project.id}-task-${i}-check`).remove();
						$(`project-${project.id}-task-${i}-label`).remove();
						$(`project-${project.id}-task-${i}-edit`).remove();
						$(`project-${project.id}-task-${i}-delete`).remove();


						// Update Database
						updateProjectInIDB(project);

					});

				}, 100);
			}
			
		
			taskHTML += `<p id="taskAdd${project.id}" class="pointer">&#65291 Add Task</p>`;
			taskContainer.innerHTML = taskHTML;


			// Creates functionality for Add Task button
			// Powers the Add Task button on each project
			const taskBtn = $(`taskAdd${project.id}`);
			taskBtn.addEventListener('click', () => {
				// Add a task to the project
				project.taskArray.push({text: "New Task", completed: false});
				// Add a task to the Database
				updateProjectInIDB(project);

				// Adds task to DOM
				loadTasks();
			});
		}

		loadTasks();
		

	});

	console.log(`loadProjectToDOM() finished`);
};

export {loadProjectsToDOM}