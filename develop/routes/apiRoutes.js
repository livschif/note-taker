// dependencies
const fs = require('fs');
const path = require('path');
// npm package that allows you to create a unique id
const uniqid = require('uniqid');

module.exports = (app) => {
    app.get('/api/notes', (res, req) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    app.post('/api/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);
        res.json(db);
// creating body for note
        let userNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid(),
        };
// pushing the created note to be written in the db.json file
        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);
    });

// the /api/notes/:id should recive a query parameter containing the id of the note to delete
    app.delete('/api/notes/:id', (res, req) => {
        let db = JSON.parse(fs.readFileSync('db/db.json'))
        // removing note with id
        let deleteNotes = db.filter(item => item.id !== req.params.id);
        // rewriting note to db.json
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
        res.json(deleteNotes);
    })
};