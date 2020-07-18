const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

var username = "";
var password = "";

console.log("Please log into your local database.")
inquirer.prompt([
    {
        type: "input",
        name: "usr",
        message: "Username: "
    },
    {
        type: "password",
        name: "pwd",
        message: "Password: "
    }
]).then(answer => {
    username = answer.usr;
    password = answer.pwd;
    con();
});

function con(){
    var connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: username,
        password: password,
        database: "employee_db"
    });
    
    connection.connect(function(err){
        if(err) throw err;
        console.log("Connected to database!");
        mainMenu();
    });
}

function mainMenu(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Welcome to the database manager, please choose an option.',
            choices: [
                "Add Departments, Roles, or Employees",
                "View Departments, Roles, or Employees",
                "Update Employee Roles",
                "Update Managers",
                "View Employees by Manager",
                "Delete Departments, Roles, or Employees",
                "View Total Utilized Budget of a Department"
            ]
        }
    ]).then(answer => {
        switch(answer.mainMenu){
            case 'Add Departments, Roles, or Employees':
                addMenu();
                break;
            case 'View Departments, Roles, or Employees':
                viewMenu();
                break;
            case 'Update Employee Roles':
                updateMenu();
                break;
            default:
                console.log("Sorry, that choice is not implemented yet.");
                mainMenu();
                break;
        }
    });
}

function addMenu(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'addMenu',
            message: 'What would you like to add?',
            choices: [
                "Department",
                "Role",
                "Employee",
                "Cancel"
            ]
        }
    ]).then(answers => {
        switch(answers.addMenu){
            case 'Department':
                addDepartment();
                break;
            case 'Role':
                addRole();
                break;
            case 'Employee':
                addEmployee();
                break;
            case 'Cancel':
                mainMenu();
                break;
        }
    });
}

function viewMenu(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'viewMenu',
            message: 'What would you like to view?',
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "Cancel"
            ]
        }
    ]).then(answers => {
        switch(answers.viewMenu){
            case 'Departments':
                console.table()
                break;
            case 'Roles':
                addRole();
                break;
            case 'Employees':
                addEmployee();
                break;
            case 'Cancel':
                mainMenu();
                break;
        }
    });
}

function updateMenu(){

}