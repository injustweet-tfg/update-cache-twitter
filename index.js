
import fetch from "node-fetch";
/*
const response = await fetch('https://precariedapp.herokuapp.com/get', {
    method: "GET"
})
    .then(res => res.json()).then(res => console.log(res));
*/


const prueba = "[{\"link\":\"https://twitter.com/Mari196222/status/1513231827821027334\",\"id\":1513231827821027300,\"text\":\"yomerebelo10a yomerebelo10a no al acoso mediático adoctrinamiento humillaciones vulnerar dchos tramas policiales apagón cloaca lfdlt al lío\",\"user\":\"Mari196222\",\"date\":1649613956,\"likes\":0,\"retweets\":0,\"replies\":0,\"hashtags\":[\"YoMeRebelo10A\",\"YoMeRebelo10A\"]},{\"link\":\"https://twitter.com/Mari196222/status/1513232118029107202\",\"id\":1513232118029107200,\"text\":\"yomerebelo10a yomerebelo10a no al acoso mediático adoctrinamiento humillaciones vulnerar dchos tramas policiales apagón cloaca lfdlt al lío\",\"user\":\"Mari196222\",\"date\":1649614026,\"likes\":0,\"retweets\":0,\"replies\":0,\"hashtags\":[\"YoMeRebelo10A\",\"YoMeRebelo10A\"]}]";
console.log(JSON.stringify(JSON.parse(prueba)));

// await fetch("https://cache-twitter.herokuapp.com/delete", {
//     method: "DELETE"
// })
//     .catch(error => {
//         console.log(error);
//         return;
//     });


await fetch("https://cache-twitter.herokuapp.com/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(JSON.parse(prueba)),
})
    .catch(error => {
        console.log(error);
        return;
    });

