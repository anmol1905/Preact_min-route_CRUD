const express = require('express');
const cors = require('cors')
const minRoute = require('min-route')
// create express app
const app = express();
app.use(cors());
require('./db')

// parse requests of content-type - application/json
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//allows browser client to interact with resources from a different //origin

minRoute.api(app, [`${__dirname}/controller.js`])

// app.post('/api', controller.postUser)

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});