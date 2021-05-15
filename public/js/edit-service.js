// A function to edit a service
async function editFormHandler(event) {
    event.preventDefault();

    // get the service id from the url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Get the service title and service text from the form
    const title = document.querySelector('input[name="service-title"]').value;
    const description = document.querySelector('textarea[name="service-text"]').value;

    // use the update route to update the service
    const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // if the edit action is successful, redirect to the user profile page, otherwise display the error
    if (response.ok) {
        document.location.replace('/userprofile');
        // otherwise, display the error
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.edit-service-form').addEventListener('submit', editFormHandler);
