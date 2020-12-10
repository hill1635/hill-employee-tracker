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
            // Issue with the switch case?

            // switch (answer.action) {
            //     case 'View All Employees':
            //         displayAll();
            //         break;

            //     case 'View All Employees by Department':
            //         viewDepartment();
            //         break;

            //     case 'View All Employees by Manager':
            //         viewManager();
            //         break;

            //     case 'Add Employee':
            //         addEmployee();
            //         break;

            //     case 'Remove Employee':
            //         removeEmployee();
            //         break;
            // }

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
                listEmployees();
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
        connection.end();
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
        connection.end();
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
        connection.end();
    });
}


const removeEmployee = (employees) =>
    inquirer.prompt([
        {
            // Needs to be list of employees
            type: 'list',
            name: 'remove',
            message: 'Who would you like to remove?',
            choices: employees
        },
    ])
        .then((answer) => {
            deleteEmployee();
        });

// Fix function name to make more sense
const listEmployees = () => {
    var employees = [];
    connection.query('SELECT * FROM people', function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {
            var employee = res[i].first_name + ' ' + res[i].last_name;
            // var employeeString = JSON.stringify(employee);
            employees.push(employee);
        }
        removeEmployee(employees);
        // console.log('test 1: ', employees);
    });
}

const deleteEmployee = () => {
    // For loop
    // Parses name selection into first_name and last_name
    // Moves to separate arrays?
    // If statement - first & last names match up

    var query = 'DELETE FROM people WHERE last_name = ' + answer.lastName + ' AND first_name = ' + answer.firstName + ' ';
    // query += 'SELECT * FROM people;';
    connection.query(query, function (err, res) {
        if (err) throw err;
        displayAll();
        connection.end();
    });
}