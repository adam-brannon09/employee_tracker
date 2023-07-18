const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'QAZwsx123!',
    database: 'company_db'
},
    console.log(`Connected to the company_db database.`)
);

//Uses inquirer to prompt user for action

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


//Function to view employees. Will run if view all employees is selected

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
            db.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}", "${answer.lastName}", ${answer.roleID}, ${answer.managerID})`,
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
            db.query(`UPDATE employees SET role_id = ${answer.roleID} WHERE id = ${answer.employeeID}`,
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