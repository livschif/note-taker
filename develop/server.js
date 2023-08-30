const express = require('express');

// app uses express
const app = express();

const PORT = proces.env.PORT || 3001;

// uses express to create a route for every file
app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// routes to route file
require('./routes/apiRoutes')(app);
require('./')

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'));
// });
// // GET request for notes
// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'));
// });

// app.route('/api/notes')
// .get((req, res) {
//     res.json(database);
// })

// .post()

