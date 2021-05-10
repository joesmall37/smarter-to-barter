// A function to delete a service
async function deleteFormHandler(event) {
    event.preventDefault();

    // get the service id from the url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // delete the post with an async function
    const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE'
    });
    // if the delete action is successful, redirect to the user profile page, otherwise display the error
    if (response.ok) {
        document.location.replace('/userprofile');
        // otherwise, display the error
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-service-btn').addEventListener('click', deleteFormHandler);
