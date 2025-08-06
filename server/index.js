const express = require('express');
const cors = require('cors'); 
require('dotenv').config();

const app = express(); 
app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('AI Legal helper is Running!'); 
}); 

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { 
    console.log(`server running on http://localhost:${PORT}`); 
}); 

const explainRoute = require('./routes/explain');
app.use('/api/explain', explainRoute); 
