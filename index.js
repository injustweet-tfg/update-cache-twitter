
import fetch from "node-fetch";
import schedule from "node-schedule";


// // Schedule: at minute 0 past hour 12 and 0.
var j = schedule.scheduleJob('0 0 0,12 * * *', async function () {
    await fetch('https://precariedapp.herokuapp.com/get', { method: "GET" })
        .then(handleErrors) // Handle HTTP errors
        .then(res => res.json()) // Convert to JSON response
        .then(res => checkFormat(res)) // Check format
        .then(tweets => { // Process the JSON string
            del() // Delete all old tweets
                .then(handleErrors) // Handle HTTP errors
                .then(deleteRes => deleteRes.json()) // Convert to JSON response
                .then(deleteData => {  // Process the JSON response
                    console.log("Tweets deleted:", deleteData.deletedCount);
                    add(tweets)
                        .then(handleErrors) // Handle HTTP errors
                        .then(addRes => addRes.json()) // Convert to JSON response
                        .then(addData => console.log("Tweets added:", addData.insertedCount)) // Process the JSON response
                        .catch(err => console.log("Function add() failed.", err)); // Show errors
                })
                .catch(err => console.log("Function del() failed.", err)); // Show errors
        }
        )
        .catch(err => console.log("Function fetch() failed.", err)); // Show errors
});


function checkFormat(res) {
    // Check format (only extra commas)
    res = res.replace(new RegExp(',,+', 'g'), ',');
    try {
        JSON.parse(res);
    } catch (e) {
        throw Error("Invalid JSON");
    }
    return res;
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

async function del() {
    const response = await fetch("https://cache-twitter.herokuapp.com/delete", {
        method: "DELETE"
    });
    return response;
}

async function add(res) {
    const response = await fetch("https://cache-twitter.herokuapp.com/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: res,
    });
    return response;
}

