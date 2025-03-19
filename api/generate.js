// api/generate.js
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

module.exports = async (req, res) => {
  await cors()(req, res, () => {
    const prompt = req.body.prompt;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!prompt) {
      return res.status(400).json({ error: 'Por favor, proporciona una consulta.' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    axios.post(apiUrl, {
      contents: [{ parts: [{ text: prompt }] }]
    })
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      console.error('Error al llamar a la API de Google:', error);
      res.status(500).json({ error: 'Error al procesar la consulta.' });
    });
  });
};