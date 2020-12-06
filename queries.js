function displayAll() {
    connection.query('SELECT * FROM people', function (err, res) {
        if (err) throw err;
        console.log(res);
        // connection.end();
    });
}

function displayDepartment() {
    connection.query('SELECT * FROM people WHERE ?', { department: answer.department }, function (err, res) {
        if (err) throw err;
        console.log(res);
        // connection.end();
    }
}

module.exports = queries;