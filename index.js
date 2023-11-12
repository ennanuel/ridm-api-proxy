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
    let endpoint = req.params.endpoint.includes('musixmatch') ? process.env.MUSIXMATCH_URL : process.env.DEEZER_URL
    endpoint += req.params.endpoint.replace(/^\/[a-z]+/i, '')

    let params = {}

    for( let [field, value] of Object.entries(req.query) ) {
        params[field] = value
    }

    if(req.params.endpoint.includes('musixmatch')) {
        params['apikey'] = process.env.MUSIXMATCH_API_KEY
    }

    axios.get(endpoint, {
        params
    })
        .then(
            response => res.json(response.data)
        )
        .catch( error => {
            res.json(error)
        })
})

app.listen(process.env.PORT || 5000, () => {
    console.log('backend running')
})