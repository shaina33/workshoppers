// HELLO WORLD!
// program.js
var express = require('express');
var app = express();
app.get('/home', function(req, res) {
    res.end('Hello World!')
})
app.listen(process.argv[2])

// STATIC
// program.js
var express = require('express');
var app = express();
var pathToFile = process.argv[3];
app.use(express.static(pathToFile))
app.listen(process.argv[2])

// PUG
// program.js
var express = require('express');
var app = express();
var templatesPath = process.argv[3];
app.set('views', templatesPath)
app.set('view engine', 'pug')
app.get('/home', function(req, res) {
    res.render('index', {date: new Date().toDateString()})
})
app.listen(process.argv[2])

// GOOD OLD FORM
// program.js
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.post('/form', function(req, res) {
    res.send(req.body.str.split('').reverse().join(''))
})
app.listen(process.argv[2])

// STYLISH CSS
// program.js
var express = require('express');
var stylus = require('stylus');
var app = express();
var pathToFiles = process.argv[3];
app.use(stylus.middleware(pathToFiles))
app.use(express.static(pathToFiles))
app.listen(process.argv[2])

// PARAM PAM PAM
// program.js
var express = require('express');
var crypto = require('crypto');
var app = express();
app.put('/message/:id', function(req, res) {
    res.send(
        crypto.createHash('sha1')
        .update(new Date().toDateString() + req.params.id)
        .digest('hex'))
})
app.listen(process.argv[2])

// WHAT'S IN QUERY
// program.js
var express = require('express');
var app = express();
app.get('/search', function(req, res) {
    res.send(req.query)
})
app.listen(process.argv[2])

// JSON ME
// program.js
var express = require('express');
var fs = require('fs');
var app = express();
app.get('/books', function(req, res) {
    file = fs.readFile(process.argv[3], function(err, data) {
        var object = JSON.parse(data);
        res.json(object)
    })
})
app.listen(process.argv[2])