const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

var username = "";
var password = "";

const departmentsArr = [];
const employeesArr = [];
const rolesArr = [];


var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "testing",
    password: "",
    database: "employee_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected to database!");
    mainMenu();
});



/*console.log("Please log into your local database.")
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
    
    connection = mysql.createConnection({
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
});*/

function mainMenu(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Welcome to the database manager, please choose an option.',
            choices: [
                "Add Departments, Roles, or Employees",
                "View Departments, Roles, or Employees",
                "Update Employee Roles"/*,
                "Update Managers",
                "View Employees by Manager",
                "Delete Departments, Roles, or Employees",
                "View Total Utilized Budget of a Department"*/
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
                add("department");
                break;
            case 'Role':
                add("role");
                break;
            case 'Employee':
                add("employee");
                break;
            case 'Cancel':
                mainMenu();
                break;
        }
    });
}

function add(type){
    connection.query("SELECT name FROM departments",function(err, data){
        Object.keys(data).forEach(function(key){
            departmentsArr.push(String(data[key].name));
        });
    });

    const departmentQuestions = [
        {
            type: "input",
            name: "name",
            message: "New department name: "
        }
    ];

    const roleQuestions = [
        {
            type: "input",
            name: "title",
            message: "New role title: "
        },
        {
            type: "input",
            name: "salary",
            message: "Role's salary: "
        },
        {
            type: "list",
            name: "parentDepartment",
            message: "Which department is this role under?",
            choices: departmentsArr
        }
    ];

    const employeeQuestions = [
        {
            type: "input",
            name: "firstname",
            message: "New employee's first name: "
        },
        {
            type: "input",
            name: "lastname",
            message: "New employee's last name: "
        },
        {
            type: "list",
            name: "role",
            message: "New employee's role: ",
            choices: rolesArr
        },
        {
            type: "list",
            name: "manager",
            message: "New employee's manager: ",
            choices: employeesArr
        }
    ];

    switch(type){
        case "department":
            inquirer.prompt(departmentQuestions).then(res => {
                connection.query(`INSERT INTO departments (name) VALUE ("${res.name}")`, function(err, response){
                    if(err) throw err;
                    console.log(response);
                });
            });

            mainMenu();
            break;
        case "role":
            inquirer.prompt(roleQuestions).then(res => {

                console.log(`New role: ${res.title}\nRole's salary: ${res.salary}\nParent Department: ${res.parentDepartment}`);

                connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${res.title}", ${res.salary}, (SELECT id FROM departments WHERE name = "${res.parentDepartment}"));`, function(err, response){
                    if(err) throw err;

                    console.log(response);
                });
            });

            mainMenu();
            break;

        case "employee":
            inquirer.prompt(employeeQuestions).then(res => {

            });

            mainMenu();
            break;
    }
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
                connection.query("SELECT * FROM employee_db.departments LIMIT 100;", function(err, data){
                    if(err) throw err;

                    console.table(data);
                });
                break;
            case 'Roles':
                connection.query("SELECT * FROM employee_db.roles LIMIT 100;", function(err, data){
                    if(err) throw err;

                    console.table(data);
                });
                break;
            case 'Employees':
                connection.query("SELECT * FROM employee_db.employees LIMIT 100;", function(err, data){
                    if(err) throw err;

                    console.table(data);
                });
                break;
            case 'Cancel':
                mainMenu();
                break;
        }

        mainMenu();
    });
}

function updateMenu(){

}