const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(
    cors({
        origin: '*'
    })
)

app.get(':endpoint([\\/\\w\\.-]*)', (req, res) => {
    let endpoint = process.env.API_BASE_URL + req.params.endpoint

    axios.get(endpoint)
        .then(
            response => res.json(response.data)
        )
        .catch( error => {
            res.json(error)
        })
})

app.listen(3000)