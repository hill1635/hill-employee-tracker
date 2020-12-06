const inquirer = require('inquirer');
const mysql = require('mysql');
const query = require('./queries');
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
    console.log('connected as id ' + connection.threadID);
    init();
});

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
            // Issue with the switch case?
            switch (answer.action) {
                case 'View All Employees':
                    query.displayAll();
                    break;

                case 'View All Employees by Department':
                    viewDepartment();
                    break;

                case 'View All Employees by Manager':
                    viewManager();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;
            }
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
            query.displayByDepartment();
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
            query.displayByManager();
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
            type: 'input',
            name: 'department',
            message: 'What department do they work in?'
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
            const newQuery = new query(answer.firstName, answer.lastName, answer.title, answer.department, answer.salary, answer.manager);
            newQuery.newEmployee();
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
            query.deleteEmployee();
        });