const express = require('express');
const routes = require('./routes'); // Import the router from routes.js.

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies.
app.use('/', routes); // Mount the router

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;

