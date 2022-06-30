const inquirer = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')
const connection = require('./config/connection')

connection.connect(function (err) {
    if (err) { console.log(err) }
    startList();
});
console.log(`,-----------------------------------------------------.
|                                                     |
|     _____                 _                         |
|    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |
|    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
|    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |
|    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
|                    |_|            |___/             |
|                                                     |
|     __  __                                          |
|    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
|    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       |
|    | |  | | (_| | | | | (_| | (_| |  __/ |          |
|    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
|                              |___/                  |
|                                                     |
\`-----------------------------------------------------'
`);
// this is the starting function that will ask questions to navigate through program
function startList() {
    inquirer.prompt({

        type: 'list',
        name: 'startList',
        message: 'Where would you like to start?',
        choices: ['View all employees', 'View all departments', 'View all roles', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    })
    .then((res)=>{
        // handles the first answer of the user and runs the correct function based on their answer
        if(res.startList === "View all employees"){
            allEmployees()
        }
        else if(res.startList === "View all departments") {
            allDept()
        } else if(res.startList === "View all roles") {
            allRoles()
        } else if(res.startList === "Add a department") {
            addDept()
        } else if(res.startList === "Add a role") {
            addRole()
        } else if(res.startList === "Add an employee") {
            addEmployee()
        } else if(res.startList === "Update an employee role") {
            updateEmployee()
        } 
    })



function allEmployees() {
    connection.query('SELECT * FROM employee;',
    function (err, result) {
        if (err) { console.log(err) }
        console.table(result)
        startList();
    })
}
 
function allDept() {
    connection.query('SELECT * FROM department;',
    function (err, result) {
        if (err) { console.log(err) }
        console.table(result)
        startList();
    })
}
 
function allRoles() {
    connection.query('SELECT * FROM role;',
    function (err, result) {
        if (err) { console.log(err) }
        console.table(result)
        startList();
    })
}
 
function addDept() {

    inquirer.prompt({

        type: 'input',
        name: 'addDept',
        message: 'What is the name of the department?',

    })
        .then((res) => {
            connection.query('INSERT INTO department SET ?;',
                {
                    name: res.addDept,
                },
                function (err, result) {
                    if (err) { console.log(err) }
                    console.table(result)
                    startList();
                })
        })
}
 
function addRole() {
//specific questions for adding a role
    var addRoleQ = [
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'salRole',
            message: 'What is the salary of the role?',
        },
        {
            type: 'input',
            name: 'deptRole',
            message: 'Which dept ID is the role apart of?',
        },
    ]

    inquirer.prompt(addRoleQ)
        .then((res) => {
            connection.query('INSERT INTO role SET ?;',
                {
                    title: res.role,
                    salary: res.salRole,
                    department_id: res.deptRole
                },
                function (err, result) {
                    if (err) { console.log(err) }
                    console.table(result)
                    startList();

                })
        })
}
 
function addEmployee() {
    //specific questions for adding a employee 
    var addEmployeeQ = [
        {
            type: 'input',
            name: 'first',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'last',
            message: "What is the employee's last name?",
        },
        {
            type: 'input',
            name: 'eRole',
            message: "What is the role id for the employee?",
        },
        {
            type: 'input',
            name: 'eManager',
            message: "What is the manager ID for the employee?",
        },
    ]

    inquirer.prompt(addEmployeeQ)
        .then((res) => {
            connection.query('INSERT INTO employee SET ?;',
                {
                    first_name: res.first,
                    last_name: res.last,
                    role_id: res.eRole,
                    manager_id: res.eManager
                },
                function (err, result) {
                    if (err) { console.log(err) }
                    console.table(result)
                    startList();
                })
        })
}
 
function updateEmployee() {
    var updateRoleQ = [
        {
            type: 'input',
            name: 'employeeID',
            message: "Enter the Id of the employee that needs the role updated."
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: "Which role ID do you want to assign?",
        },
    ]

    inquirer.prompt(updateRoleQ)
        .then((res) => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?',
                [res.EmployeeRole, res.employeeID],
                function (err, result) {
                    if (err) { console.log(err) }
                    console.table(result)
                    startList();
                })
        })
}
 

}