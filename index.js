/* index.js is the main server file
 **********************************
 * In-place:
 *      Student table GET request handler
 *      User input student data POST request handler
 * To-do:
 *      Duplicate validation for student data when input and respond accordingly
 *      Email authentication i.e. whether it is REAL UCD email (may need some sort of UCD API + key?)
 *      Remove rows that are older than 6 years (At most 5? Arbitrary?)
 */

// Load Express module
const express = require('express');
// Body parsing middleware, i.e. req.body
const bodyParser = require('body-parser');
// Possibly require DB modules below when/if needed
const db = require("./sql");
// Express object
const app = express();

/**** Express Pipeline Start ****/

// get JSON from request body -> JSON.parse() -> req.body
// i.e. JSON to JS object 
app.use(bodyParser.json());

// serving static files 
// i.e. make 'public' directory available
app.use(express.static('public'));

// FOR DEBUGGING
// app.use((req, res, next) => {
//     console.log(req.method, ": ", req.url);
//     next();
// });

// if file unspecified, go to main page (index.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/getStudentTable', async (req, res) => {
    const getAllCmd = 'SELECT * FROM StudentTable';
    try {
        let fullTable = await db.all(getAllCmd);
        res.send(fullTable);
    } catch(err) { console.log('Error: ', err); }
});

app.post('/studentData', async (req, res) => {
    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let email = req.body.email;
    let level = req.body.level;

    const insertStudentCmd = 'INSERT INTO StudentTable (firstname, lastname, email, level) values (?, ?, ?, ?)';
    await db.run(insertStudentCmd, [fname, lname, email, level]);
    // console.log("###",fname, lname, email, level);

    res.send( { answer: '42' } );
});

app.use(function(req, res) {
    res.status(404);
    res.type('txt');
    res.send('404 - File ' + req.url + ' not found');
});

/**** Express Pipeline End ****/

// Listener for HTTP requests
// i.e. event listener for server
const listener = app.listen(3000, function() {
    console.log('The static server is listening to port ', + listener.address().port);
});
