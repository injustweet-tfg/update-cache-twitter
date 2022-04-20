
import fetch from "node-fetch";
import schedule from "node-schedule";

// https://crontab.guru/
// https://javascript.plainenglish.io/scheduling-tasks-on-heroku-ebfa63c124dd
// var j = schedule.scheduleJob('* * * * * *', function () {
//     console.log('The answer to life, the universe, and everything!');
// });


const response = await fetch('https://precariedapp.herokuapp.com/get', {
    method: "GET"
})
    .then(res => res.json())
    .then(res => {
        console.log(res);
        // add(res);
        // del(res);
    }
    );

async function del(res) {
    await fetch("https://cache-twitter.herokuapp.com/delete", {
        method: "DELETE"
    })
        .catch(error => {
            console.log(error);
            return;
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
        .catch(error => {
            console.log(error);
            return;
        });
}