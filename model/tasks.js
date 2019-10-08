var pool = require('../database');
var util = require('../utils/network')

exports.getAll = function(req, res) {
    return new Promise( (resolve) => {
        pool.getConnection(function(err, connection) {
            connection.query(
                'SELECT * FROM tasks', 
                function(error, rows, fields) {
                    if (error != null) {
                        resolve(JSON.stringify(util.getErrorMessage()))
                    } else {
                        resolve(JSON.stringify(util.getPayloadMessage(rows)))
                    }
            })
            connection.release()
        });
    })
}

exports.getSpecific = function(req) {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {
            console.log("req.params.id: " + pool.escape(req.params.id))
            connection.query(
                'SELECT * FROM tasks WHERE id = ?;', 
                [req.params.id], 
                function(error, rows, fields) {
                    if (error != null) {
                        resolve(JSON.stringify(util.getErrorMessage()))
                    } else {
                        resolve(JSON.stringify(util.getPayloadMessage(rows)))
                    }
                }
            )
            connection.release()
        });
    })
}

exports.edit = function(req) {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {
            var body = req.body.params
            connection.query(
                'UPDATE tasks SET name = ?, status = ? WHERE id = ?', 
                [pool.escape(body.name), pool.escape(body.status), req.params.id], 
                function(error, rows, fields) {
                    if (error != null) {
                        resolve(JSON.stringify(util.getErrorMessage()))
                    } else {
                        resolve(JSON.stringify(util.getMessage(200, (rows.affectRows == 0) ? "No change applied" : "Data is changed")))
                    }
                    
                }
            )
            connection.release()
        });
    })
}

exports.create = function(req) {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {
            var body = req.body.params
            connection.query(
                'INSERT INTO tasks SET name = ?, status = ?', 
                [pool.escape(body.name), pool.escape(body.status)], 
                function(error, rows, fields) {
                    if (error != null) {
                        resolve(JSON.stringify(util.getErrorMessage()))
                    } else {
                        resolve(JSON.stringify(util.getMessage(200, (rows.affectRows == 0) ? "Data hasn't been inserted" : "Row has been created")))
                    }
                }
            )
            connection.release()
        });
    })
}

exports.delete = function(req) {
    return new Promise((resolve) => {
        pool.getConnection(function(err, connection) {
            console.log("exports.delete: " + pool.escape(req.params.id))
            connection.query(
                'DELETE FROM tasks WHERE id = ?;', 
                [req.params.id], 
                function(err, rows, fields) {
                    if (err != null) {
                        resolve(JSON.stringify(util.getErrorMessage()))
                    } else {
                        resolve(JSON.stringify(util.getPayloadMessage((rows.affectRows == 0) ? "Data hasn't been deleted" : "Data has been deleted")))
                    }
                }
            )
            connection.release() 
        });
    })
}