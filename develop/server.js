const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const express = require('express');
// app uses express
const app = express();

const allNotes = require('./db/db.json');

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (res, req) => {
    res.json(allNotes.slice(1));
});

app.get('/', (res, req) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNewNote(body, notesArray) {
    const userNote = body;
    if (!Array.isArray(notesArray))
    notesArray = [];
    
    if(notesArray.length === 0)
    notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(userNote);
    fs.writeFileSync(
        path.join(__dirname, 'db/db.json'), 
        JSON.stringify(notesArray, null, 2)
    );
    return userNote;
}

app.post('/api/notes', (req, res) => {
    const userNote = createNewNote(req.body, allNotes);
    res.json(userNote);
});

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

app.delete('/api/notes/:id', (res, req) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

// starts the server
app.listen(PORT, () => {
    console.log(`Server available at http://localhost:${PORT}`)
});