/* Filename:     index.js
 * Author:       Mac Lee
 * Created:      9/13/2022
 * School:       UC Davis
 * Purpose:      Screening test
 * Description:  Main server file
 */

// Load Express module
const express = require('express');
// Body parsing middleware, i.e. req.body
const bodyParser = require('body-parser');
// Possibly require DB modules below when/if needed
/* DB MODULE(S) */
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

app.post('/studentData', (req, res) => {
    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let email = req.body.email;
    let level = req.body.level;

    console.log("###",fname, lname, email, level);

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
