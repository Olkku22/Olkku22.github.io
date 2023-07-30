const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/menu', async (req, res) => {
  try {
    const response = await axios.get('http://ruokalistat.leijonacatering.fi/rss/2/1/25b3a8ba-f813-e511-892b-78e3b50298fc');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
