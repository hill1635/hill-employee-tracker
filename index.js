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

// class Index extends Query {

const init = () =>
    inquirer.prompt([
        {
            type: 'list',
            name: 'init',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles'],
        },
    ])
        .then((answer) => {
            // Issue with the switch case? Functions not defined.

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

            // const newQuery = new Query (firstName, lastName, title, department, salary, manager);

            if (answer.init === 'View All Employees') {
                displayAll();
            } else if (answer.init === 'View All Employees by Department') {
                viewDepartment();
            } else if (answer.init === 'View All Employees by Manager') {
                viewManager();
            } else if (answer.init === 'Add Employee') {
                addEmployee();
            } else if (answer.init === 'Remove Employee') {
                removeEmployee();
            }
        });

const displayAll = () =>
    // Views employees as objects, need to convert to table format somehow?
    connection.query('SELECT * FROM people', function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
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
// Displays employees as objects
            displayByDepartment(answer.department);
        });

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
            // Updates query with answers
            newEmployee();
        });

const removeEmployee = () =>
    inquirer.prompt([
        {
            // Needs to be list of employees
            type: 'list',
            name: 'remove',
            message: 'Who would you like to remove?',
            // How to display list of employees?
            choices: []
        },
    ])
        .then((answer) => {
            deleteEmployee();
        });

const displayByDepartment = (answer) => {
    connection.query('SELECT * FROM people WHERE ?', { department: answer }, function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

const displayByManager = (answer) => {
    connection.query('SELECT * FROM people WHERE ?', { manager: answer }, function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

// Set as class?
const newEmployee = () => {
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

const deleteEmployee = () => {
    // Need to modify criteria, remove option is list of employees
    var query = 'DELETE FROM people WHERE last_name = ' + answer.lastName + ' AND first_name = ' + answer.firstName + ' ';
    query += 'SELECT * FROM people;';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}
// }

// Index.init();
// const newIndex = new Index;
// init();