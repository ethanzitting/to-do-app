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

export { loadProjectsFromDatabase }
