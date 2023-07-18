//Importing dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
require('console.table');
//Connects to the company_db database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
},
    console.log(`You are now connected to the company database.`)
);

//Uses inquirer package to prompt user for action

const menu = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'start',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ],
        })
    //Switch case to run function based on user input
        .then((answer) => {
            switch (answer.start) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee':
                    updateEmployee();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Quit':
                    db.end();
                    break;
            }
        });
}


//Function to view all employees. Will run if view all employees is selected

viewEmployees = () => {
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
        menu();
    });
}

//Function to add an employee. Will run if add employee is selected

addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the new employee?',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'What is the last name of the new employee?',
            name: 'lastName',
        },
        {
            type: 'input',
            message: 'What is the role ID of the new employee?',
            name: 'roleID',
        },
        {
            type: 'input',
            message: 'What is the manager ID of the new employee?',
            name: 'managerID',
        }
    ])
        .then((answer) => {
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}", "${answer.lastName}", ${answer.roleID}, ${answer.managerID})`,
                function (err, results) {
                    console.log('New Employee added');
                    menu();
                }
            )
        });
}



//Function to update an employee. Will run if update employee is selected
updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the ID of the employee you would like to update?',
            name: 'employeeID',
        },
        {
            type: 'input',
            message: 'What is the role for the new employee?',
            name: 'roleID',
        }
    ])
        .then((answer) => {
            db.query(`UPDATE employees SET role_id = ${answer.roleID} WHERE emp_id = ${answer.employeeID}`,
                function (err, results) {
                    console.log('Employee updated');
                    menu();
                });
        });
}
//Function to view all employee roles. Will run if view all roles is selected.
viewRoles = () => {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
        menu();
    });
}

//Function to add a role. Will run if add role is selected.
addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the new role?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'What is the salary of the new role?',
            name: 'salary',
        },
        {
            type: 'input',
            message: 'What is the department ID of the new role?',
            name: 'departmentID',
        }
    ])
        .then((answer) => {
            db.query(
                `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}", ${answer.salary}, ${answer.departmentID})`,
                function (err, results) {
                    console.log('New Role added');
                    menu();
                }
            )
        });
}

//Function to view all departments. Will run if view all departments is selected.
viewDepartments = () => {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
        menu();
    });
}

//Function to add a department. Will run if add department is selected.
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'deptName',
        },
    ])
        .then((answer) => {
            db.query(
                `INSERT INTO departments (dept_name) VALUES ("${answer.deptName}")`,
                function (err, results) {
                    console.log('New Department added');
                    menu();
                }
            )
        });
}

//Initializes the menu function
menu();