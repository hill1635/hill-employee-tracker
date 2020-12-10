class Query {
    // constructor(firstName, lastName, title, department, salary, manager) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.title = title;
    //     this.department = department;
    //     this.salary = salary;
    //     this.manager = manager;
    // }

    displayByDepartment() {
        connection.query('SELECT * FROM people WHERE ?', { department: answer.department }, function (err, res) {
            if (err) throw err;
            console.log(res);
            connection.end();
        });
    }

    displayByManager() {
        connection.query('SELECT * FROM people WHERE ?', { manager: answer.manager }, function (err, res) {
            if (err) throw err;
            console.log(res);
            connection.end();
        });
    }


    newEmployee() {
        var query = 'INSERT INTO people (first_name, last_name, title, department, salary, manager) ';
        query += 'VALUES (' + answer.firstName + ' , ' + answer.lastName + ' , ' + answer.title + ' , ';
        query += answer.department + ' , ' + answer.salary + ' , ' + answer.manager + ';';
        query += 'SELECT * FROM people;';
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log(res);
            connection.end();
        });
    }

    deleteEmployee() {
        // Need to modify criteria, remove option is list of employees
        var query = 'DELETE FROM people WHERE last_name = ' + answer.lastName + ' AND first_name = ' + answer.firstName + ' ';
        query += 'SELECT * FROM people;';
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log(res);
            connection.end();
        });
    }
}

// const newQuery = new Query (firstName, lastName, title, department, salary, manager);
// newQuery.displayAll();

module.exports = Query;
// export {displayAll, displayByDepartment, displayByManager, newEmployee, deleteEmployee};