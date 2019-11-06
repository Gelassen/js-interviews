const subject = require("../quantory/index")
var bodyParser = require('body-parser');
const express = require("express")
var app = express();


const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

console.log(subject.flatten([1,2,3]))

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

    var arr = req.query.arr;
    var depth = req.query.depth;

    console.log("Array param: " + arr);
    arr = JSON.stringify(arr);
    console.log("Array param as string: " + arr);
    arr = JSON.parse(arr);
    console.log("Array param as array: " + arr);
    arr = JSON.parse(arr);
    console.log("Array param as array: " + arr);
    // convert param into 

    console.log("Type: " + typeof(arr));

    console.log("Incoming params: " + arr + " Is array " + Array.isArray(arr) + " " + depth );

    var result = {result: subject.flatten(arr, depth)};

    res.send(result);
    res.end();
})

app.listen(3000);
// GET /flatten?arr=[1,2,3,4,5,6]&depth=2

// {
//     result: [1,2,3,4,5,6]
// }