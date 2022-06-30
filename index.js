const inquirer = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')
const connection = require('./config/connection')

connection.connect(function (err) {
    if (err) { console.log(err) }
    startList();
});

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
        } else if(res.startList === "Add a employee") {
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
    
}
 
function addEmployee() {
    
}
 
function updateEmployee() {
    
}
 

}