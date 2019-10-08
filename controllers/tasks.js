
var pool = require('../database');
var tasks = require('../model/tasks')

exports.all = async function(req, res) {
    let result = await tasks.getAll(req, res)
    res.send(result)
    res.end()    
}

exports.specific = async function(req, res) {
    let result = await tasks.getSpecific(req)
    res.send(result)
    res.end()    
}

exports.create = async function(req, res) {
    let result = await tasks.create(req)
    res.send(result)
    res.end()    
}

exports.edit = async function(req, res) {
    let result = await tasks.edit(req)
    res.send(result)
    res.end()    
}

exports.delete = async function(req, res) {
    let result = await tasks.delete(req)
    res.send(result)
    res.end()    
}
