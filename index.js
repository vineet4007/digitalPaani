const express = require("express");
const app = express();
const http = require('http').createServer(app)
// require("./dbConnection/dao");
const router = require('./routes')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

let listener = http.listen(process.env.PORT, function (err, success) {
    console.log("Server Connected ")
   
});

app.get('/testing-server', function (req, res, next) {
    try {
               res.status(200).send({ status: 1, messsage: "Server is working fine", payload: [] });
    } catch (err) {
        console.log("Testing-Server", err)
        res.status(200).send({ status: 1, messsage: "Server is working fine", payload: [] });
    }
})



