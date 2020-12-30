/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

// CONCATENATED MODULE: ./src/make-element.js
const makeElement = (elementType, parentId, childId, htmlToUse, referenceChild) => {
  const parent = document.querySelector(`${parentId}`)
  const child = document.createElement(`${elementType}`)
  child.setAttribute('id', `${childId}`)
  htmlToUse = htmlToUse || ''
  child.innerHTML = htmlToUse

  // Default is put it last, otherwise, put it after the included child's ID
  referenceChild = referenceChild || 'after'
  if (referenceChild == 'after') {
    parent.appendChild(child)
  } else {
    referenceChild = document.querySelector(referenceChild)
    parent.insertBefore(child, referenceChild)
  }
}



// CONCATENATED MODULE: ./src/load-page.js
;

const loadPage = () => {
  // Loads Header
  const loadHeader = () => {
    makeElement('div', 'header', 'header-home', '<h1><a href="">To-Do App</a></h1>')
    makeElement('div', 'header', 'header-more', '<h1><a href="http://ethanzitting.com/">More by Ethan</a></h1>')
  }
  loadHeader()

  // Loads Footer
  const loadFooter = () => {
    makeElement('div', 'footer', 'footer-github', '<h3><a href="">GitHub</a></h3>')
    makeElement('div', 'footer', 'footer-linkedin', '<h3><a href="">LinkedIn</a></h3>')
    makeElement('div', 'footer', 'footer-copywrite', '<h3><a href="">© 2020</a></h3>')
  }
  loadFooter()

  // Loads Body
  const loadProjectPanel = () => {
    // Builds Cosmetic Project Title Bar
    makeElement('div', 'main', 'title-bar', '<h1>Projects</h1>')

    // Builds project container div.
    makeElement('section', 'main', 'projectContainer')

    // Builds addProject button.
    makeElement('div', '#projectContainer', 'add-project-button', '&#65291 Add Project')
  }
  loadProjectPanel()
}



// CONCATENATED MODULE: ./src/get-project-id.js
// Accesses cookie to return lowest open ID.
const getProjectId = () => {
  // Global variable for containing the returned ID.
  let newProjectId

  // Global variale for 2 years from now.
  const expirationDate = new Date()
  expirationDate.setFullYear(expirationDate.getFullYear() + 2)

  // If a cookie is present...
  if (document.cookie) {
    console.log(`Cookie found: ${document.cookie}`)

    // If removing all non-number characters from the cookie returns anything,
    // There must be an ID present

    if (document.cookie.replace(/^\D+/g, '')) {
      console.log(`Cookie contains an Id: ${document.cookie.replace(/^\D+/g, '')}`)

      // Assign the ID to a variable.
      newProjectId = Number(document.cookie.replace(/^\D+/g, ''))
      console.log(`Id of ${newProjectId} retreived. Updating cookie Id.`)

      // Update the expiration date of the cookie for 2 more years.

      // Increment the cookie.
      document.cookie = `openId=${newProjectId + 1}; expires=${expirationDate}`

      // Check to make sure the cookie incremented.
      if (Number(document.cookie.replace(/^\D+/g, '')) == newProjectId + 1) {
        console.log(`Cookie successfully set to ${document.cookie.replace(/^\D+/g, '')}`)
      } else {
        console.log('Error incrementing cookie.')
      }
    }
  } else {
    console.log('Cookie not found. Setting initial cookie.')

    // Create an expiration date 2 years in the future for the first cookie.
    document.cookie = `openId=0; expires=${expirationDate}`
    newProjectId = 0

    // Now if a cookie is preset...
    if (document.cookie) {
      console.log(`Cookie successfully started at: ${document.cookie}`)
    } else {
      console.log('Error setting initial cookie')
    }

    // Assign the ID to a variable.
    newProjectId = Number(document.cookie.replace(/^\D+/g, ''))
    console.log(`Id of ${newProjectId} retreived. Updating cookie Id.`)

    // Increment the cookie.
    document.cookie = `openId=${newProjectId + 1}; expires=${expirationDate}`

    // Check to make sure the cookie incremented.
    if (Number(document.cookie.replace(/^\D+/g, '')) == newProjectId + 1) {
      console.log(`Cookie successfully set to ${document.cookie.replace(/^\D+/g, '')}`)
    } else {
      console.log('Error incrementing cookie.')
    }
  }

  return newProjectId
}



// CONCATENATED MODULE: ./src/load-projects-from-database.js
function loadProjectsFromDatabase () {
  console.log('loadProjectsFromDatabase() started')
  // Global scope variable for storing the DB.
  let db
  const projectArray = []

  // Checks that window has indexedDB capabilities.
  if (!window.indexedDB) { alert('Your browser is not supported.') };

  // Does the actual DB initialization
  const request = window.indexedDB.open('projectDatabase', 1)

  // First Time and edition change handler
  request.onupgradeneeded = e => {
    // Assigns the database to db
    db = e.target.result

    // Create an object store named projects, or retrieve it if it already exists.
    let projects
    if (!db.objectStoreNames.contains('projects')) {
      projects = db.createObjectStore('projects', { keyPath: 'id' })
    } else {
      projects = request.transaction.objectStore('projects')
    }

    /* I don't think I need this code, as the projects should be
		    already searchable by ID.
			if (!projects.indexNames.contains('id')) {
				projects.createIndex('id', 'id');
			}
		*/

    console.log('Database setup complete')
  }

  // Error Handler
  request.onerror = e => { console.log(`Database failed to open. Error Code: ${e.target.errorCode}`) }

  // Success Handler and actual meat of this function
  request.onsuccess = e => {
    console.log('Database opened successfully.')

    // Assigns the databse to db
    db = e.target.result

    // Opens transaction
    const tx = db.transaction(['projects'], 'readonly')

    // pulls data stored in objectStore
    const store = tx.objectStore('projects')

    // Opens cursor to iterate through data
    store.openCursor().onsuccess = e => {
      // Assigns resulting cursor to a variable
      const cursor = e.target.result

      // If the cursor contains an item...
      if (cursor) {
        // Push the cursor's content onto the projectArray variable
        projectArray.push(cursor.value)
        console.log(cursor.value)
        cursor.continue()
      }
    }
  }

  console.log('loadProjectsFromDatabase() finished')
  return projectArray
}



// CONCATENATED MODULE: ./src/$-file.js
function $ (element) {
  element = document.getElementById(element)
  return element
}



// CONCATENATED MODULE: ./src/update-project-in-IDB.js
const updateProjectInIDB = (newProject) => {
  // Global scope variable for storing the DB.
  let db

  // Checks that window has indexedDB capabilities.
  if (!window.indexedDB) { alert('Your browser is not supported.') };

  // Does the actual DB initialization
  const request = window.indexedDB.open('projectDatabase', 1)

  // First Time and edition change handler
  request.onupgradeneeded = e => {
    // Assigns the database to db
    db = e.target.result

    // Create an object store named projects, or retrieve it if it already exists.
    let projects
    if (!db.objectStoreNames.contains('projects')) {
      projects = db.createObjectStore('projects', { keyPath: 'id' })
    } else {
      projects = request.transaction.objectStore('projects')
    }

    /* I don't think I need this code, as the projects should be
				already searchable by ID.
			if (!projects.indexNames.contains('id')) {
				projects.createIndex('id', 'id');
			}
		*/

    console.log('Database setup complete')
  }

  // Error Handler
  request.onerror = e => { console.log(`Database failed to open. Error Code: ${e.target.errorCode}`) }

  // Success Handler and actual meat of this function
  request.onsuccess = e => {
    console.log('Database opened successfully.')

    // Assigns the databse to db
    db = e.target.result

    // Opens transaction
    const tx = db.transaction(['projects'], 'readwrite')

    // pulls data stored in objectStore
    const store = tx.objectStore('projects')

    // Adds project object to DB, overwriting the old one with the same ID
    store.put(newProject)

    // Check for transaction results.
    tx.oncomplete = function () { console.log('project updated') }
    tx.onerror = e => { console.log('erorr updating project ' + e.target.errorCode) }
  }
}



// CONCATENATED MODULE: ./src/db-init.js
const dbInit = (inputFunction) => {
  // Global scope variable for storing the DB.
  let db

  // Checks that window has indexedDB capabilities.
  if (!window.indexedDB) { alert('Your browser is not supported.') };

  // Does the actual DB initialization
  const request = window.indexedDB.open('projectDatabase', 1)

  // First Time and edition change handler
  request.onupgradeneeded = e => {
    // Assigns the database to db
    db = e.target.result

    // Create an object store named projects, or retrieve it if it already exists.
    let projects
    if (!db.objectStoreNames.contains('projects')) {
      projects = db.createObjectStore('projects', { keyPath: 'id' })
    } else {
      projects = request.transaction.objectStore('projects')
    }
  }

  // Error Handler
  request.onerror = e => { console.log(`Database failed to open. Error Code: ${e.target.errorCode}`) }

  // Success Handler and actual meat of this function
  request.onsuccess = e => {
    // Assigns the databse to db
    db = e.target.result

    // Opens transaction
    const tx = db.transaction(['projects'], 'readwrite')

    // pulls data stored in objectStore
    const store = tx.objectStore('projects')

    // Runs the input function provided by the user.
    inputFunction(store)

    // Check for transaction results.
    tx.oncomplete = function () {}
    tx.onerror = e => { console.log('erorr editing database ' + e.target.errorCode) }
  }
}



// CONCATENATED MODULE: ./src/projects-to-DOM.js
;




const loadProjectsToDOM = (projectArray) => {
  projectArray.forEach((project) => {
    // Primary Project Container Div
    makeElement(
      'div',
      '#projectContainer',
      `project-${project.id}`,
      '',
      '#add-project-button'
    )
    const projectDiv = $(`project-${project.id}`)
    projectDiv.setAttribute('class', 'project-div')

    // Create the title div, the title h1, an the edit button
    const titleDivHTML = `<h1 id="project-${project.id}-title">${project.title}</h1><button id="project-${project.id}-title-edit"><span class="material-icons">border_color</span></button><button id="project-${project.id}-delete"><span class="material-icons task-span">delete</span></button>`
    makeElement(
      'div',
      `#project-${project.id}`,
      `project-${project.id}-title-div`,
      titleDivHTML
    )
    $(`project-${project.id}-title-div`).setAttribute('class', 'title-div')

    const title = $(`project-${project.id}-title`)
    const titleEdit = $(`project-${project.id}-title-edit`)
    const projectDelete = $(`project-${project.id}-delete`)

    // Changes the edit icon, makes the title editable, and powers the save button
    const editTitle = () => {
      titleEdit.innerHTML = '<span class="material-icons">save</span>'
      titleEdit.addEventListener('click', saveTitle)

      // Focuses user on now editable title field.
      title.setAttribute('contenteditable', true)
      title.focus()
    }

    // Changes the save icon, saves the new title to the database, and resets the edit button.
    const saveTitle = () => {
      // Save New Title to app
      project.title = title.innerHTML

      // Save new title to database;
      updateProjectInIDB(project)

      // Change icon back to edit and make content static
      title.setAttribute('contenteditable', false)
      titleEdit.innerHTML = '<span class="material-icons">border_color</span>'
      titleEdit.removeEventListener('click', saveTitle)
      titleEdit.addEventListener('click', editTitle)
    }

    // Changes edit icon to save icon and powers its functionality
    titleEdit.addEventListener('click', editTitle)

    // Powers the delete functionality for the whole project
    projectDelete.addEventListener('click', () => {
      // Update Program
      // Find index of this project in the project array
      let arrayIndex

      for (let i = 0; i < projectArray.lengthp; i++) {
        if (projectArray[i].id == project.id) {
          arrayIndex = i
          break
        }
      }

      projectArray.splice(arrayIndex, 1)

      // Update Database
      const databaseCommand = (objectStore) => {
        objectStore.delete(project.id)
      }

      dbInit(databaseCommand)

      // Update DOM
      $(`project-${project.id}`).remove()
    })

    // Create the description div, the description p, and the edit button
    const descriptionDivHTML = `<p id="project-${project.id}-description">${project.description}</p>
												<button id="project-${project.id}-description-edit"><span class="material-icons md-16">border_color</span></button>`
    makeElement(
      'div',
      `#project-${project.id}`,
      `project-${project.id}-description-div`,
      descriptionDivHTML
    )
    $(`project-${project.id}-description-div`).setAttribute(
      'class',
      'description-div'
    )

    const description = document.querySelector(
      `#project-${project.id}-description`
    )
    const descriptionEdit = document.querySelector(
      `#project-${project.id}-description-edit`
    )

    // Changes the edit icon, makes the description editable, and powers the save button
    const editDescription = () => {
      descriptionEdit.innerHTML =
        '<span class="material-icons md-16">save</span>'
      descriptionEdit.addEventListener('click', saveDescription)

      // Focuses user on now editable description field.
      description.setAttribute('contenteditable', true)
      description.focus()
    }

    // Changes the save icon, saves the new title to the database, and resets the edit button.
    const saveDescription = () => {
      // Save New description to app
      project.description = description.innerHTML

      // Save new description to database;
      updateProjectInIDB(project)

      // Change icon back to edit and make content static
      description.setAttribute('contenteditable', false)
      descriptionEdit.innerHTML =
        '<span class="material-icons md-16">border_color</span>'
      descriptionEdit.removeEventListener('click', saveDescription)
      descriptionEdit.addEventListener('click', editDescription)
    }

    // Changes edit icon to save icon and powers its functionality
    descriptionEdit.addEventListener('click', editDescription)

    makeElement(
      'div',
      `#project-${project.id}`,
      `project-${project.id}-task-div`
    )

    // Code generating the task HTML

    const loadTasks = () => {
      const taskContainer = $(`project-${project.id}-task-div`)

      let taskHTML = ''
      for (let i = 0; i < project.taskArray.length; i++) {
        const task = project.taskArray[i]

        if (task.completed) {
          taskHTML += `<input type="checkbox" class="pointer" name="task-${i}" id="project-${project.id}-task-${i}-check" checked="true">
					<label for="task-${i}"><span id="project-${project.id}-task-${i}-label">${task.text}</span><span id="project-${project.id}-task-${i}-edit" class="material-icons md-12 task-span">border_color</span><span id="project-${project.id}-task-${i}-delete" class="material-icons md-12 task-span">delete</span></label><br>`
        } else {
          taskHTML += `
					<input type="checkbox" class="pointer" id="project-${project.id}-task-${i}-check" name="task-${i}">
					<label for="task-${i}"><span id="project-${project.id}-task-${i}-label">${task.text}</span><span id="project-${project.id}-task-${i}-edit" class="material-icons md-12 task-span">border_color</span><span id="project-${project.id}-task-${i}-delete" class="material-icons md-12 task-span">delete</span></label><br>`
        }

        setTimeout(() => {
          // Powers changing of completed status
          const checkbox = $(`project-${project.id}-task-${i}-check`)
          checkbox.addEventListener('click', () => {
            // Updates task in the program.
            task.completed = !task.completed

            // Updates task in the database.
            updateProjectInIDB(project)
          })

          // Powers editing of task text
          const taskText = $(`project-${project.id}-task-${i}-label`)
          const taskEdit = $(`project-${project.id}-task-${i}-edit`)

          // Changes the edit icon, makes the task editable, and powers the save button
          const editTask = () => {
            taskEdit.innerHTML =
              '<span class="material-icons md-12">save</span>'
            taskEdit.addEventListener('click', saveTask)

            // Focuses user on now editable task field.
            taskText.setAttribute('contenteditable', true)
            taskText.focus()
          }

          // Changes the save icon, saves the new title to the database, and resets the edit button.
          const saveTask = () => {
            // Save New task to app
            project.taskArray[i].text = taskText.innerHTML

            // Save new task to database;
            updateProjectInIDB(project)

            // Change icon back to edit and make content static
            taskText.setAttribute('contenteditable', false)
            taskEdit.innerHTML =
              '<span class="material-icons md-12">border_color</span>'
            taskEdit.removeEventListener('click', saveTask)
            taskEdit.addEventListener('click', editTask)
          }

          // Changes edit icon to save icon and powers its functionality
          taskEdit.addEventListener('click', editTask)

          // Powers the delete button
          const deleteBtn = $(`project-${project.id}-task-${i}-delete`)
          deleteBtn.addEventListener('click', () => {
            // Delete Task from Project
            project.taskArray.splice(i, 1)

            $(`project-${project.id}-task-${i}-check`).remove()
            $(`project-${project.id}-task-${i}-label`).remove()
            $(`project-${project.id}-task-${i}-edit`).remove()
            $(`project-${project.id}-task-${i}-delete`).remove()

            // Update Database
            updateProjectInIDB(project)

            loadTasks()
          })
        }, 100)
      }

      taskHTML += `<p id="taskAdd${project.id}" class="pointer">&#65291 Add Task</p>`
      taskContainer.innerHTML = taskHTML

      // Creates functionality for Add Task button
      // Powers the Add Task button on each project
      const taskBtn = $(`taskAdd${project.id}`)
      taskBtn.addEventListener('click', () => {
        // Add a task to the project
        project.taskArray.push({ text: 'New Task', completed: false })
        // Add a task to the Database
        updateProjectInIDB(project)

        // Adds task to DOM
        loadTasks()
      })
    }

    loadTasks()
  })
}



// CONCATENATED MODULE: ./src/module-aggregator.js
// Import Modules
;










// CONCATENATED MODULE: ./src/script.js
// Import Modules
;

// Factory for making new project objects
const projectFactory = () => {
  const id = getProjectId()
  const title = 'Add Title'
  const description = 'Add Description'
  const taskArray = []
  const favorite = false

  return { id, title, description, taskArray, favorite }
}

/* Builds basic page framework for next functions to work with */
loadPage()

// Pulls existing projects from IDB
const projectArray = loadProjectsFromDatabase()

setTimeout(() => {
  loadProjectsToDOM(projectArray)
}, 750)

// Power the add-project-button to create and display a new project
const addProjBtn = $('add-project-button')
addProjBtn.addEventListener('click', () => {
  // On-click, create a new project.
  createProject()
})

// Creates a new, bare project in the DOM, program, and database.
const createProject = () => {
  // Create Bare Project in DOM
  const project = projectFactory()

  projectArray.push(project)

  const dbCommand = (objectStore) => {
    objectStore.add(project)
  }
  dbInit(dbCommand)

  console.log('createProject activates projectFactory(). Result:')

  makeElement('div', '#projectContainer', `project-${project.id}`, '', '#add-project-button')
  const projectDiv = $(`project-${project.id}`)
  projectDiv.setAttribute('class', 'project-div')

  // Create the title div, the title h1, an the edit button
  const titleDivHTML = `<h1 id="project-${project.id}-title">${project.title}</h1>
										<button id="project-${project.id}-title-edit"><span class="material-icons">border_color</span></button><button id="project-${project.id}-delete"><span class="material-icons task-span">delete</span></button>`
  makeElement('div', `#project-${project.id}`, `project-${project.id}-title-div`, titleDivHTML)
  $(`project-${project.id}-title-div`).setAttribute('class', 'title-div')

  const title = $(`project-${project.id}-title`)
  const titleEdit = $(`project-${project.id}-title-edit`)
  const projectDelete = $(`project-${project.id}-delete`)

  // Changes the edit icon, makes the title editable, and powers the save button
  const editTitle = () => {
    titleEdit.innerHTML = '<span class="material-icons">save</span>'
    titleEdit.addEventListener('click', saveTitle)

    // Focuses user on now editable title field.
    title.setAttribute('contenteditable', true)
    title.focus()
  }

  // Changes the save icon, saves the new title to the database, and resets the edit button.
  const saveTitle = () => {
    // Save New Title to app
    project.title = title.innerHTML

    // Save new title to database;
    updateProjectInIDB(project)

    // Change icon back to edit and make content static
    title.setAttribute('contenteditable', false)
    titleEdit.innerHTML = '<span class="material-icons">border_color</span>'
    titleEdit.removeEventListener('click', saveTitle)
    titleEdit.addEventListener('click', editTitle)
  }

  // Changes edit icon to save icon and powers its functionality
  titleEdit.addEventListener('click', editTitle)

  // Powers the delete functionality for the whole project
  projectDelete.addEventListener('click', () => {
    // Update Program
    // Find index of this project in the project array
    let arrayIndex

    for (let i = 0; i < projectArray.lengthp; i++) {
      if (projectArray[i].id == project.id) {
        arrayIndex = i
        break
      }
    }

    projectArray.splice(arrayIndex, 1)

    // Update Database
    const projectId = project.id
    const databaseCommand = (objectStore) => {
      objectStore.delete(project.id)
    }

    dbInit(databaseCommand)

    // Update DOM
    $(`project-${project.id}`).remove()
  })

  // Create the description div, the description p, and the edit button
  const descriptionDivHTML = `<p id="project-${project.id}-description">${project.description}</p>
												<button id="project-${project.id}-description-edit"><span class="material-icons md-16">border_color</span></button>`
  makeElement('div', `#project-${project.id}`, `project-${project.id}-description-div`, descriptionDivHTML)
  $(`project-${project.id}-description-div`).setAttribute('class', 'description-div')

  const description = document.querySelector(`#project-${project.id}-description`)
  const descriptionEdit = document.querySelector(`#project-${project.id}-description-edit`)

  // Changes the edit icon, makes the description editable, and powers the save button
  const editDescription = () => {
    descriptionEdit.innerHTML = '<span class="material-icons md-16">save</span>'
    descriptionEdit.addEventListener('click', saveDescription)

    // Focuses user on now editable description field.
    description.setAttribute('contenteditable', true)
    description.focus()
  }

  // Changes the save icon, saves the new title to the database, and resets the edit button.
  const saveDescription = () => {
    // Save New description to app
    project.description = description.innerHTML

    // Save new description to database;
    updateProjectInIDB(project)

    // Change icon back to edit and make content static
    description.setAttribute('contenteditable', false)
    descriptionEdit.innerHTML = '<span class="material-icons md-16">border_color</span>'
    descriptionEdit.removeEventListener('click', saveDescription)
    descriptionEdit.addEventListener('click', editDescription)
  }

  // Changes edit icon to save icon and powers its functionality
  descriptionEdit.addEventListener('click', editDescription)

  makeElement('div', `#project-${project.id}`, `project-${project.id}-task-div`)

  // Code generating the task HTML

  const loadTasks = () => {
    const taskContainer = $(`project-${project.id}-task-div`)

    let taskHTML = ''
    for (let i = 0; i < project.taskArray.length; i++) {
      const task = project.taskArray[i]

      if (task.completed) {
        taskHTML += `<input type="checkbox" class="pointer" name="task-${i}" id="project-${project.id}-task-${i}-check" checked="true">
					<label for="task-${i}"><span id="project-${project.id}-task-${i}-label">${task.text}</span><span id="project-${project.id}-task-${i}-edit" class="material-icons md-12 task-span">border_color</span><span id="project-${project.id}-task-${i}-delete" class="material-icons md-12 task-span">delete</span></label><br>`
      } else {
        taskHTML += `
					<input type="checkbox" class="pointer" id="project-${project.id}-task-${i}-check" name="task-${i}">
					<label for="task-${i}"><span id="project-${project.id}-task-${i}-label">${task.text}</span><span id="project-${project.id}-task-${i}-edit" class="material-icons md-12 task-span">border_color</span><span id="project-${project.id}-task-${i}-delete" class="material-icons md-12 task-span">delete</span></label><br>`
      }

      setTimeout(() => {
        // Powers changing of completed status
        const checkbox = $(`project-${project.id}-task-${i}-check`)
        checkbox.addEventListener('click', () => {
          // Updates task in the program.
						 task.completed = !task.completed

						 // Updates task in the database.
						 updateProjectInIDB(project)
					 })

					 // Powers editing of task text
        const taskText = $(`project-${project.id}-task-${i}-label`)
        const taskEdit = $(`project-${project.id}-task-${i}-edit`)

        // Changes the edit icon, makes the task editable, and powers the save button
        const editTask = () => {
          taskEdit.innerHTML = '<span class="material-icons md-16">save</span>'
          taskEdit.addEventListener('click', saveTask)

          // Focuses user on now editable task field.
          taskText.setAttribute('contenteditable', true)
          taskText.focus()
        }

        // Changes the save icon, saves the new title to the database, and resets the edit button.
        const saveTask = () => {
          // Save New task to app
          project.taskArray[i].text = taskText.innerHTML

          // Save new task to database;
          updateProjectInIDB(project)

          // Change icon back to edit and make content static
          taskText.setAttribute('contenteditable', false)
          taskEdit.innerHTML = '<span class="material-icons md-16">border_color</span>'
          taskEdit.removeEventListener('click', saveTask)
          taskEdit.addEventListener('click', editTask)
        }

        // Changes edit icon to save icon and powers its functionality
        taskEdit.addEventListener('click', editTask)

        // Powers the delete button
        const deleteBtn = $(`project-${project.id}-task-${i}-delete`)
        deleteBtn.addEventListener('click', () => {
          // Delete Task from Project
          project.taskArray.splice(i, 1)

          $(`project-${project.id}-task-${i}-check`).remove()
          $(`project-${project.id}-task-${i}-label`).remove()
          $(`project-${project.id}-task-${i}-edit`).remove()
          $(`project-${project.id}-task-${i}-delete`).remove()

          // Update Database
          updateProjectInIDB(project)
        })
      }, 100)
    }

    taskHTML += `<p id="taskAdd${project.id}" class="pointer">&#65291 Add Task</p>`
    taskContainer.innerHTML = taskHTML

    // Creates functionality for Add Task button
    // Powers the Add Task button on each project
    const taskBtn = $(`taskAdd${project.id}`)
    taskBtn.addEventListener('click', () => {
      // Add a task to the project
      project.taskArray.push({ text: 'New Task', completed: false })
      // Add a task to the Database
      updateProjectInIDB(project)

      // Adds task to DOM
      loadTasks()
    })
  }
  loadTasks()
}

/******/ })()
;