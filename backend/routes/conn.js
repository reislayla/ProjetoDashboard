const db      = require('mysql');

const connection = db.createConnection({
    host     : 'localhost',
    database : 'hugochallenge',
    user     : 'root',
    password : '',
})

//Check login error
/*
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
})


connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
})

connection.end();*/

module.exports = connection;