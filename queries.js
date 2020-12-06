function displayAll() {
    connection.query('SELECT * FROM people', function (err, res) {
        if (err) throw err;
        console.log(res);
        // connection.end();
    });
}

function displayByDepartment() {
    connection.query('SELECT * FROM people WHERE ?', { department: answer.department }, function (err, res) {
        if (err) throw err;
        console.log(res);
        // connection.end();
    });
}

function displayByManager() {
    connection.query('SELECT * FROM people WHERE ?', { manager: answer.manager }, function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

function newEmployee() {
    var query = 'INSERT INTO people (first_name, last_name, title, department, salary, manager) ';
    query += 'VALUES (' + answer.firstName + ' , ' + answer.lastName + ' , ' + answer.title + ' , ';
    query += answer.department + ' , ' + answer.salary + ' , ' + answer.manager + ';';
    query += 'SELECT * FROM people;';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

function deleteEmployee() {
    var query = 'DELETE FROM people WHERE last_name = ' + answer.lastName + ' AND first_name = ' + answer.firstName + ' ';
    query += 'SELECT * FROM people;';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

module.exports = queries;