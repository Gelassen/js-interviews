var pool = require('../database');

exports.getAll = function(req, res) {
    return new Promise( (resolve) => {
        pool.getConnection(function(err, connection) {
            connection.query('SELECT * FROM tasks', function(query, rows, fields) {
                resolve(JSON.stringify(rows))
            })
            console.log('connection.release()')
            connection.release()
        });
    })
}

exports.getSpecific = function() {
    pool.getConnection(function(err, connection) {
        connection.query(
            'SELECT * FROM tasks WHERE id = ?', 
            [pool.escape(req.params.id)], 
            function(query, rows, fields) {
                resolve(JSON.stringify(rows))
            }
        )
        connection.release()
    });
}

exports.edit = function() {
    pool.getConnection(function(err, connection) {
        connection.query(
            'UPDATE tasks SET name = ?, status = ? WHERE id = ?', 
            [pool.escape(req.body.name), pool.escape(req.body.status), pool.escape(req.body.id)], 
            function(query, rows, fields) {
                resolve(JSON.stringify(rows))
            }
        )
        connection.release()
    });
}

exports.create = function() {
    pool.getConnection(function(err, connection) {
        var body = req.body
        connection.query(
            'INSERT INTO tasks SET id = ?, name = ?, status = ?', 
            [pool.escape(body.id), pool.escape(body.name), pool.escape(body.status)], 
            function(query, rows, fields) {
                
            }
        )
        connection.release()
    });
}

exports.delete = function() {
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