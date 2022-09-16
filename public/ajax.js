'use strict'

async function sendPostRequest(url, data) {
    let params = {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };

    try {
        let response = await fetch(url, params);
        if(response.ok) { return await response.json(); }
        else            { throw Error(response.status); }
    }
    catch(err) {
        alert("Error: ", err);
    }
    console.log("received response");
}