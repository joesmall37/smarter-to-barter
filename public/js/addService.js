// New Service Form Handler
async function newFormHandler(event) {
    event.preventDefault();

    // Get the post title and post text from the form
    const name = document.querySelector('input[name="service-title"]').value;
    const description = document.querySelector('textarea[name="service-text"]').value;

    // use the add a new post Service route to add the service
    // user id is added from the session information in the route
    const response = await fetch(`/api/services`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // if the response is okay, reload the page, showing the newest service now in the user's profile
    if (response.ok) {
        document.location.replace('/userprofile');
        // otherwise, display the error
    } else {
        alert(response.statusText);
    }
}

// Event Listener for the new post submit button
document.querySelector('.new-service-form').addEventListener('submit', newFormHandler);
