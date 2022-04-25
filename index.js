
import fetch from "node-fetch";
import schedule from "node-schedule";


// Schedule: at minute 0 past hour 12 and 0.
var j = schedule.scheduleJob('* 0 0,12 * * *', function () {
    const response = await fetch('https://precariedapp.herokuapp.com/get', { method: "GET" })
        .then(handleErrors) // Handle HTTP errors
        .then(res => res.json()) // Convert to JSON
        .then(tweets => { // Process the JSON
            del() // Delete all old tweets
                .then(handleErrors) // Handle HTTP errors
                .then(deleteRes => deleteRes.json()) // Convert to JSON
                .then(deleteData => {  // Process the JSON
                    console.log("Tweets deleted:", deleteData.deletedCount);
                    add(tweets)
                        .then(handleErrors) // Handle HTTP errors
                        .then(addRes => addRes.json()) // Convert to JSON 
                        .then(addData => console.log("Tweets added:", addData.insertedCount)) // Process the JSON
                        .catch(err => console.log("Function add() failed.", err)); // Show errors
                })
                .catch(err => console.log("Function del() failed.", err)); // Show errors
        }
        )
        .catch(err => console.log("Function fetch() failed.", err)); // Show errors
});



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

