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

// serving static files 
// i.e. make 'public' directory available
app.use(express.static('public'));

// get JSON from request body -> JSON.parse() -> req.body
// i.e. JSON to JS object 
app.use(bodyParser.json());

// if file unspecified, go to main page (index.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// FOR DEBUGGING
app.use((req, res) => {
    console.log(req.method, ": ", req.url);
});

// INCLUDE ADDITIONAL REQUEST HANDLERS BELOW

/**** Express Pipeline End ****/

// Listener for HTTP requests
// i.e. event listener for server
const listener = app.listen(3000, function() {
    console.log('The static server is listening to port ', + listener.address().port);
});
