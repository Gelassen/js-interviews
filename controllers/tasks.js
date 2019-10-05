
var pool = require('../database');

exports.all = function(req, res) {
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * FROM tasks', function(query, rows, fields) {
            res.send(JSON.stringify(rows))      
            res.end()
        })
        connection.release()
    });    
}

exports.specific = function(req, res) {
    pool.getConnection(function(err, connection) {
        connection.query(
            'SELECT * FROM tasks WHERE id = ?', 
            [pool.escape(req.params.id)], 
            function(query, rows, fields) {
                res.send(JSON.stringify(rows))
                res.end()
            }
        )
        connection.release()
    });
}

exports.create = function(req, res) {
    pool.getConnection(function(err, connection) {
        var body = req.body
        connection.query(
            'INSERT INTO tasks SET id = ?, name = ?, status = ?', 
            [pool.escape(body.id), pool.escape(body.name), pool.escape(body.status)], 
            function(query, rows, fields) {
                res.send(JSON.stringify(rows))        
                res.end()
            }
        )
        connection.release()
    });
}

exports.edit = function(req, res) {
    pool.getConnection(function(err, connection) {
        connection.query(
            'UPDATE tasks SET name = ?, status = ? WHERE id = ?', 
            [pool.escape(req.body.name), pool.escape(req.body.status), pool.escape(req.body.id)], 
            function(query, rows, fields) {
                res.send(JSON.stringify(rows))        
                res.end()
            }
        )
        connection.release()
    });
}

exports.delete = function(req, res) {
    connection.query(
        'DELETE FROM tasks WHERE id = ?', 
        [pool.escape(req.body.id)], 
        function(query, rows, fields) {
            res.send('Row has been deleted')
            res.end()
        }
    )
    connection.release()
}