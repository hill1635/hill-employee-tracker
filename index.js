const inquirer = require('inquirer');
const mysql = require('mysql');
const Query = require('./queries');
const consoleTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'pass',
    database: 'employee_db'
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log('connected as id ' + connection.threadID);
    init();
});

const init = () =>
    inquirer.prompt([
        {
            type: 'list',
            name: 'init',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Quit'],
        },
    ])
        .then((answer) => {
            // Try switch case?

            if (answer.init === 'View All Employees') {
                displayAll();
            } else if (answer.init === 'View All Employees by Department') {
                viewDepartment();
            } else if (answer.init === 'View All Employees by Manager') {
                viewManager();
            } else if (answer.init === 'Add Employee') {
                addEmployee();
            } else if (answer.init === 'Remove Employee') {
                // Fix function name to make more sense
                listEmployees(answer.init);
            } else if (answer.init === 'Update Employee Role') {
                listEmployees(answer.init);
            } else if (answer.init === 'Update Employee Manager') {
                listEmployees(answer.init);
            } else if (answer.init === 'View All Roles') {
                viewRoles();
            } else if (answer.init === 'Quit') {
                connection.end();
            }
        });

const displayAll = () =>
    connection.query('SELECT * FROM people', function (err, res) {
        if (err) throw err;

        // Formatting for displaying specific employees by a specific property
        // console.log(res[1].id);

        console.table(res);
        init();
    });


const viewDepartment = () =>
    inquirer.prompt([
        {
            type: 'list',
            name: 'department',
            message: 'Which department would you like to view?',
            choices: ['Management', 'Sales', 'Accounting', 'Administration', 'Quality Assurance', 'Customer Service', 'Human Resources']
        }
    ])
        .then((answer) => {
            displayByDepartment(answer.department);
        });

const displayByDepartment = (answer) => {
    connection.query('SELECT * FROM people WHERE ?', { department: answer }, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}


const viewManager = () =>
    inquirer.prompt([
        {
            type: 'input',
            name: 'manager',
            message: 'Who is their manager?'
        },
    ])
        .then((answer) => {
            displayByManager(answer.manager);
        });

const displayByManager = (answer) => {
    connection.query('SELECT * FROM people WHERE ?', { manager: answer }, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}


const addEmployee = () =>
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is their first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is their last name?'
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is their title?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department do they work in?',
            choices: ['Management', 'Sales', 'Accounting', 'Administration', 'Quality Assurance', 'Customer Service', 'Human Resources']
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is their salary?'
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is their manager?',
            choices: ['Jo Bennett', 'David Wallace', 'Michael Scott']
        },
    ])
        .then((answer) => {
            newEmployee(answer.firstName, answer.lastName, answer.title, answer.department, answer.salary, answer.manager);
        });

// Set as class?
const newEmployee = (firstName, lastName, title, department, salary, manager) => {
    var query = 'INSERT INTO people (first_name, last_name, title, department, salary, manager) ';
    query += 'VALUES (\'' + firstName + '\', \'' + lastName + '\', \'' + title + '\', \'';
    query += department + '\', \'' + salary + '\', \'' + manager + '\');';
    connection.query(query, function (err, res) {
        if (err) throw err;
        displayAll();
        init();
    });
}

const removeEmployee = (employees) =>

    inquirer.prompt([
        {
            type: 'list',
            name: 'remove',
            message: 'Who would you like to remove?',
            choices: employees
        },
    ])
        .then((answer) => {
            // Removes from DB
            deleteEmployee(answer.remove);
            // connection.end();
        });

// Fix function name to make more sense
const listEmployees = (answer) => {
    var employees = [];

    connection.query('SELECT * FROM people', function (err, res) {
        if (err) throw err;

        // Generates employee list
        for (i = 0; i < res.length; i++) {
            var employee = res[i].first_name + ' ' + res[i].last_name;
            employees.push(employee);
        }
        // Runs inquirer with employees array
        if (answer === 'Remove Employee') {
            removeEmployee(employees);
        } else if (answer === 'Update Employee Role') {
            updateRole(employees);
        } else if (answer === 'Update Employee Manager') {
            updateManager(employees);
        }
    });
}

const deleteEmployee = (answer) => {
    var name = answer.split(' ');

    // Need to incorporate ID or array index somehow, deletes all employees by that name.
    var query = 'DELETE FROM people WHERE first_name = \'' + name[0] + '\' AND last_name = \'' + name[1] + '\';';
    connection.query(query, function (err, res) {
        if (err) throw err;
        displayAll();
        init();
    });
}

const updateRole = (employees) =>
    inquirer.prompt([
        {
            name: 'employee',
            type: 'list',
            message: 'Which employee would you like to update?',
            choices: employees
        },
        {
            name: 'role',
            type: 'input',
            message: 'What is their new role?'
        }
    ])
        .then((answer) => {
            // Turn employee into object, re-assign id numbers?
            newRole(answer.employee, answer.role);
        });

const newRole = (employee, role) => {
    var name = employee.split(' ');
    connection.query(
        'UPDATE people SET ? WHERE ? AND ?',
        [
            {
                title: role
            },
            {
                first_name: name[0]
            },
            {
                last_name: name[1]
            }
        ],
        function (err, res) {
            if (err) throw err;
            displayAll();
            init();
        });
}

const updateManager = (employees) =>
    inquirer.prompt([
        {
            name: 'manager',
            type: 'list',
            message: 'Which employee would you like to update?',
            choices: employees
        }
    ])
        .then((answer) => {
            // Query function here.
            // connection.end();
        });

const viewRoles = () => {
    connection.query('SELECT title FROM people', function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}