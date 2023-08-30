// dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db')

// app uses express
const app = express();

const PORT = proces.env.PORT || 3001;

// link to assets
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
// GET request for notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

