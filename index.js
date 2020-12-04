var inquirer = require('inquirer');
const SQL = require('SQL');
// var db = require('./employeeDB.sql');

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
            if (answer.init === 'View All Employees') {
                //Function that displays employeeDB in node?
                //afterConnection();?
            } else if (answer.init === 'View All Employees by Department') {
                viewDepartment();
            } else if (answer.init === 'View All Employees by Manager') {
                //Filter by manager function
            } else if (answer.init === 'Add Employee') {
                addEmployee();
            } else if (answer.init === 'Remove Employee') {
                //Delete by id# function.
            }
        });

init();