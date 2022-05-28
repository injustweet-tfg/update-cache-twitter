
import fetch from "node-fetch";
import schedule from "node-schedule";

// To update the data base by deleting all data and adding everything updated
// // Schedule: every two days at 9am
var j = schedule.scheduleJob('0 0 9 */2 * *', async function () {
    await fetch('https://precariedappv2.herokuapp.com/get', { method: "GET" })
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

// To check format (only extra commas)
function checkFormat(res) {
    res = res.replace(new RegExp(',,+', 'g'), ',');
    try {
        JSON.parse(res);
    } catch (e) {
        throw Error("Invalid JSON");
    }
    return res;
}

// To handle errors
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// To delete all data from our data base
async function del() {
    const response = await fetch("https://cache-twitter.herokuapp.com/delete", {
        method: "DELETE"
    });
    return response;
}

// To add data to our data base
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

