const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

require('dotenv').config();

const HEADERS = {
   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0'
}

app.use(
    cors({
        origin: '*'
    })
)

app.get('/musixmatch/:endpoint([\\/\\w\\.-]*)', async function (req, res) { 
    try {
        const { endpoint } = req.params;
        const FULL_URL = `${process.env.MUSIXMATCH_URL}/${endpoint}`;

        let params = { ...req.query, apikey: process.env.MUSIXMATCH_API_KEY };

        const response = await axios.get(FULL_URL, { params, headers: HEADERS });
        const result = response.data;
        return res.status(200).json(result); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

app.get('/deezer/:endpoint([\\/\\w\\.-]*)', async function (req, res) { 
    try {
        const { endpoint } = req.params;
        const FULL_URL = `${process.env.DEEZER_URL}/${endpoint}`;

        let params = req.query;

        const response = await axios.put(FULL_URL, { params, headers: HEADERS });
        const result = response.data;
        return res.status(200).json(result); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log('proxy running...')
})