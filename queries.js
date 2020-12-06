var mysql = require('mysql');
var consoleTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employeeDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadID);
    afterConnection();
});

function afterConnection() {
    connection.query('SELECT * FROM people', function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}


module.exports = queries;