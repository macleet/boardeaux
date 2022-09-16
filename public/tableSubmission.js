'use strict'

// Grabs the values from the submission form in order to send to 
async function submission(event) {

    let firstName = document.getElementById("first-name-input").value;
    let lastName  = document.getElementById("last-name-input").value;
    let email     = document.getElementById("email-input").value;
    let level     = document.getElementById("level-input").value;

    let studentData = {
        "firstname": firstName,
        "lastname": lastName,
        "email": email,
        "level": level
    };
    
    event.preventDefault();
    await sendPostRequest('/studentData', studentData);
}

const form = document.getElementById('form');
form.addEventListener('submit', submission);