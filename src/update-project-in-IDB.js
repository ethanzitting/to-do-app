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

export { updateProjectInIDB }
