//Requirements
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get('/', (req, res) => {
    res.send("Server is running properly");
});

app.post('/message', (req, res) => {

    const { name, email, subject, message } = req.body;

    const data = JSON.stringify({
        "collection": process.env.COLLECTION,
        "database": process.env.DB,
        "dataSource": process.env.DATA_SOURCE,
        "document": {
            name,
            email,
            subject,
            message
        }
    });

    const config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-axltk/endpoint/data/v1/action/insertOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.API_KEY,
        },
        data: data
    };

    axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
    }).catch(function (error) {
        console.log(error);
    });

});

//Listening on PORT
app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT ${process.env.PORT}`);
});