const express = require("express"),
 app = express();

 let PORT = process.env.PORT || 8080

// RandomGPSGenerator = function(start) {
//     let lat = start[0];
//     let lng = start[1];
//     let ranLat = Math.random()*0.1;
//     let ranLng = Math.random()*0.1;
//     let posOrNegLat = Math.random() < 0.5 ? -1 : 1;
//     let posOrNegLng = Math.random() < 0.5 ? 1 : -1;
//     ranLat= +(posOrNegLat*ranLat).toFixed(3);
//     ranLng= +(posOrNegLng*ranLng).toFixed(3);
//     return [lat+ranLat, lng+ranLng];
// }

app.get('/shipLoc', (req, res) => {
    res.send();
})

