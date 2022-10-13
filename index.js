const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Server is running properly");
});

app.post('/message', (req, res) => {

    const { name, email, subject, message } = req.body;

    const data = JSON.stringify({
        "collection": "messages",
        "database": "portfolioDB",
        "dataSource": "Cluster0",
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
            'api-key': '9ZlB63x7BOdPi6W8yx81QTpmJv8u1ABj2NkZ3CWCkGXMzK4lSbVNzOTCfhXaLxYY',
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
app.listen(8080 || process.env.PORT, () => {
    console.log(`Server started on PORT ${8080 || process.env.PORT}`);
});