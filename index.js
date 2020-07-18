const mysql = require("mysql");
const inquirer = require("inquirer");

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
        switch(answers.addMenu){
            case 'Departments':
                addDepartment();
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






console.log(process.env.MYSQL_LOCALPW);
mainMenu();