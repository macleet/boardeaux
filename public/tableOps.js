/* tableOps.js includes operations for the client side table
 ***********************************************************
 * In-place:
 *      Table population
 *      Student data submission by user
 * To-do:
 *      HIGH PRIORITY:      Populated with for loops for current testing, use a better method (UCD student pop: ~35000)
 *      HIGH PRIORITY:      Toggle for edit
 *      HIGH PRIORITY:      Send new data to server and populate (w/o communicating server?) new data after edit
 *      MEDIUM PRIORITY:    Function that manages the size of table and implements pagination accordingly
 *                          First, previous, next, last (Buttons hidden according to which page and how many pages)
 *      MEDIUM PRIORITY:    Search funtion with good search algorithm and populate in real time
 *      LOW PRIORITY:       Button for table refresh
 *      LOW PRIORITY:       Button for table download
 *      LOW PRIORITY:       Button for row delete
 */

'use strict'

// Populates table data from server side onto the table on the client side
async function populateTable() {
    // use sendGetRequest() from ajax.js
    let studentResp  = await fetch('/getStudentTable');
    let studentTable = await studentResp.json();

    let fullnames = studentTable.map(item => item.firstname + ' ' + item.lastname);
    let emails = studentTable.map(item => item.email);
    let levels = studentTable.map(item => item.level);

    // **HIGH PRIORITY: Populated with for loops for current testing, use a better method
    for(let i = 0; i < 7; i++) {
        document.getElementsByClassName("name")[i].textContent = fullnames[i];
        document.getElementsByClassName("email")[i].textContent = emails[i];
        document.getElementsByClassName("level")[i].textContent = levels[i];
    }
}

// Grabs the values from the submission form in order to send to the server
async function submission(event) {
    // DOM elements of input fields
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
    
    event.preventDefault();     // to prevent the page from reloading every submit
    await sendPostRequest('/studentData', studentData);
    populateTable();    // Need to populate table every time user submit valid data
}

// Medium Priority: Make this a cancallable action
function makeEditable() {
    this.removeEventListener('click', makeEditable);

    let prevName  = this.parentNode.parentNode.children[0].value;
    let prevEmail = this.parentNode.parentNode.children[1].value;
    let prevLevel = this.parentNode.parentNode.children[2].value;
    // let button = this;
    // function makeUneditable(button, prevName, prevEmail, prevLevel) {
    //     button.removeEventListener(prevName, prevEmail, prevLevel);
    //     button.parentNode.parentNode.children[0].textContent = prevName;
    //     button.parentNode.parentNode.children[1].textContent = prevEmail;
    //     button.parentNode.parentNode.children[2].textContent = prevLevel;
    // }
    // this.addEventListener('click', makeUneditable(button, prevName, prevEmail, prevLevel));  

    this.parentNode.parentNode.children[0].textContent = '';
    this.parentNode.parentNode.children[1].textContent = '';
    this.parentNode.parentNode.children[2].textContent = '';

    // // Create new input form
    let newFnameIn = document.createElement("input");
    let newLnameIn = document.createElement("input");
    let newEmailIn = document.createElement("input");
    let newLevelIn = document.createElement("input");
    let newSubmit  = document.createElement("input");
    
    // Set types for form
    newFnameIn.type = "text"; 
    newLnameIn.type = "text"; 
    newLevelIn.type = "text";
    newEmailIn.type = "email";
    newSubmit.type  = "submit";

    // Set id
    newFnameIn.id = "first-name-input";
    newLnameIn.id = "last-name-input";
    newEmailIn.id = "email-input";
    newLevelIn.id = "level-input";
    newSubmit.id  = "student-submit";

    // Set class
    newFnameIn.className = "name-input";
    newLnameIn.className = "name-input";

    // Set required
    newFnameIn.required = true;
    newLnameIn.required = true;
    newLevelIn.required = true;
    newEmailIn.required = true;

    // Set hidden
    newSubmit.hidden = true;

    // Append form
    this.parentNode.parentNode.children[0].append(newFnameIn);
    this.parentNode.parentNode.children[0].append(newLnameIn); 
    this.parentNode.parentNode.children[1].append(newEmailIn);
    this.parentNode.parentNode.children[2].append(newLevelIn);
    this.parentNode.parentNode.children[3].append(newSubmit);
}

function makeUneditable(prevName, prevEmail, prevLevel) {
    // this.removeEventListener('click', makeUneditable(prevName, prevEmail, prevLevel));
    // this.parentNode.parentNode.children[0].textContent = prevName;
    // this.parentNode.parentNode.children[1].textContent = prevEmail;
    // this.parentNode.parentNode.children[2].textContent = prevLevel;
    // this.addEventListener('click', makeEditable);
}

// For submission button (hidden, action on Enter press)
const form = document.getElementById('form');
form.addEventListener('submit', submission);

const editButton = document.getElementsByClassName('edit-button');
// loop for event listeners for seven edit buttons
for(let i = 0; i < 7; i++) { editButton[i].addEventListener('click', makeEditable); }
populateTable();    // populate table on page load