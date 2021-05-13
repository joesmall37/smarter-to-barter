// Sign up form handler
async function signupFormHandler() {
    // event.preventDefault();


    // get the information from the sign up form
    // const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // if all three fields have content
    if (email && password) {
        // POST the new user to the user table in the database
        const response = await fetch('/api/users/signup', {
            method: 'post',
            body: JSON.stringify({
                // username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // when the fetch promise is fufilled, check the response status and convey the results
        if (response.ok) {
            alert('Account created! Logging you in now.');
            document.location.replace('/userprofile');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('#log').addEventListener('click', function() {
    signupFormHandler()
    console.log("click")
});

