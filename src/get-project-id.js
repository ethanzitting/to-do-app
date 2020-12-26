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

export {
  getProjectId
}
