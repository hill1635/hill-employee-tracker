const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
// How to connect queries?
// const queries = ('./queries');

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
            // Or switch statement?
            switch (answer.action) {
                case 'View All Employees':
                    //Function that displays employeeDB in node?
                    //afterConnection();?
                    break;
                case 'View All Employees by Department':
                    viewDepartment();
                    break;
                case 'View All Employees by Manager':
                    //Filter by manager function
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Remove Employee':
                    //Delete by id# function.
                    break;
            }
        }
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
            type: 'input',
            name: 'manager',
            message: 'Who is their manager?'
        },
    ])
        .then((answer) => {
            //Add new employee to employeeDB.sql
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
            //different afterConnection function that filters table by department
        });
