const express = require('express');
const scraper = require('./scraper')
const app = express();

//Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//API route
app.get('/api/search', (req, res) => {
    // only allowed for essentia.js demos to use this fork of the project
    res.set('Access-Control-Allow-Origin', 'http://mtg.upf.edu/');
    scraper.youtube(req.query.q, req.query.key, req.query.pageToken)
        .then(x => res.json(x))
        .catch(e => res.send(e));
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port 8080');
});

module.exports = app;
