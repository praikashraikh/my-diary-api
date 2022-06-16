const express = require("express");
const app = express();

function getDiaries(req, res) {
  return res.json({ OK: 1 });
}

function getUsers(req, res) {
    return res.json([{ name: 'Prkash'}, {emai: 'prakra@gmail.com'}])
}

        // endpoint  // function envoked for endpoint
app.get('/diaries', getDiaries);

app.get('/users', getUsers);


// http:localhost:3000/endpoint
app.listen(3000);