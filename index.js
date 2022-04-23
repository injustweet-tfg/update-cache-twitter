
import fetch from "node-fetch";
import schedule from "node-schedule";


// Schedule: at minute 0 past hour 12 and 0.
var j = schedule.scheduleJob('* 0 0,12 * * *', function () {
    const response = await fetch('https://precariedapp.herokuapp.com/get', {
        method: "GET"
    })
        .then(res => res.json())
        .then(res => {
            // console.log(res);
            del().then(() => add(res));
        }
        );
});

async function del() {
    await fetch("https://cache-twitter.herokuapp.com/delete", {
        method: "DELETE"
    });
}

async function add(res) {
    await fetch("https://cache-twitter.herokuapp.com/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: res,
    })
}