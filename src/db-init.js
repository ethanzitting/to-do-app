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

export { dbInit }
