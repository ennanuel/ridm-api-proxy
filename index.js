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

app.get(':endpoint([\\/\\w\\.-]*)', async (req, res) => {
    try {
        const { endpoint } = req.params;
        const apiURL = endpoint.includes('musixmatch') ? process.env.MUSIXMATCH_URL : process.env.DEEZER_URL;
        const apiEndpoint = endpoint.replace(/^\/[a-z]+/i, '');
        const fullAPIPath = `${apiURL}${apiEndpoint}`;

        let params = {};
        for(let [field, value] of Object.entries(req.query) ) {
            params[field] = value;
        }

        if(endpoint.includes('musixmatch')) {
            params['apikey'] = process.env.MUSIXMATCH_API_KEY;
        }

        const response = await axios.get(fullAPIPath, { params });
        const result = response.data;
        return res.status(200).json(result); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log('backend running')
})