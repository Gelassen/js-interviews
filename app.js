var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var tasks = require('../neuro-city/controllers/tasks')

const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
    console.log("[REQUEST] " + JSON.stringify(req.path))
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/', function(req, res, next) {
    res.send('Hello World!')
})

app.get('/tasks', function(req, res, next) {
    tasks.all(req, res)
})

app.get('/tasks/:id', function(req, res, next) {
    tasks.specific(req, res)
})

app.post('/tasks/create', function(req, res, next) {
    tasks.create(req, res)
})

app.post('/tasks/edit/:id', function(req, res, next) {
    tasks.edit(req, res)
})

app.post('/tasks/delete/:id', function(req, res, next) {
    tasks.delete(req, res)
});

app.listen(3000)

