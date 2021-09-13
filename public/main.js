const update = document.querySelector('#update-button')
update.addEventListener('click', _ => {
    // The easiest way to trigger a PUT request in modern browsers is to use the Fetch API.
    // fetch(endpoint, options)
    // We need to tell the server we’re sending JSON data by setting the Content-Type headers to application/json
    fetch('/tasks', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Sleep',
            time: '10 PM'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
    // Next, we need to convert the data we send into JSON. We can do this with JSON.stringify. This data is passed via the body property.
})

const deleteButton = document.querySelector('#delete-button')
deleteButton.addEventListener('click', _ => {
    fetch('/tasks', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Sleep',
            time: '10 PM'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No task to delete') {
                messageDiv.textContent = 'No Task to Delete'
            } else {
                window.location.reload(true)
            }
        })
})