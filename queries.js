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
    query += 'VALUES ( { first_name: answer.firstName } , { last_name: answer.lastName } , { title = answer.title } , ';
    query += '{ department: answer.department } , { salary: answer.salary } , { manager: answer.manager } ;';
    query += 'SELECT * FROM people';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

module.exports = queries;