const subject = require("../quantory/index")
const controller = require("../quantory/controller")

var bodyParser = require('body-parser');
const express = require("express")
var app = express();


console.log("App starts");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
    console.log("[REQUEST] " + JSON.stringify(req.path))
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/', function(req, res, next) {
    res.send('Hello, avaialble API is GET /flatten?arr=[1,[2,3,[4],5],6]&depth=2')
})

app.get('/flatten', function(req, res, next) {
    // no validator on incoming params as was discussed for this task
    
    var arr = req.query.arr;
    var depth = req.query.depth;

    arr = subject.convertToArray(arr);
    
    controller.flatten(res, arr, depth);
})

app.listen(3000);