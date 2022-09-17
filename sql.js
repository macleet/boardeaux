/* sql.js Contains DB operations that have been Promisified
 *        Will be using SQLite3
 **********************************************************
 * In-place:
 *      db.run: No retrieve
 *      db.get: One retrieve
 *      db.all: Multiple retrieve
 *      Student table initialization
 * To-do:
 * 
 */

'use strict'

const sql = require('sqlite3');
const util = require('util');

// DB object
const db = new sql.Database("ucd-student.db");

// Wrap DB commands in Promises
db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);


initTable()
.catch( err => console.log("initTable error: ", err) );

// Initialize table
async function initTable() {
    const tableExistCmd  = "SELECT name FROM sqlite_master WHERE type='table' AND name='StudentTable'";
    const createTablecmd = 'CREATE TABLE StudentTable (rowIdNum INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, email TEXT, level TEXT)';

    // If table does not exist, create one
    const tableName = await db.get(tableExistCmd); 
    if(!tableName) { await db.run(createTablecmd) }
    else { 
        await db.run('DELETE FROM StudentTable');
        await db.run('vacuum');
    }
    // DEBUGGING: Above (within else) will delete .db everytime the server is reset
}

module.exports = db;