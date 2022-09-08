// require("dotenv").config();
// const mysql = require("mysql2/promise");
// const res = require("express/lib/response");
// const { default: prompt } = require("inquirer/lib/ui/prompt");

// Imports for NPM
const chalk = require("chalk");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consleTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "password",
    database: "employee_db",
  },
  console.log(`Connected to the database.`)
);
// async function main() {
// const db = await mysql.createConnection(
//   {
//     host: "localhost",
//     // MySQL username,
//     user: "root",
//     // TODO: Add MySQL password
//     password: "password",
//     database: "employee_db",
//   },
//   console.log(`Connected to the books_db database.`)
// );
// }

// Main menu prompt
function menuPrompt() {
  console.log("Employee Manager");
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What option would you like to select below?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((data) => {
      if (data.menu === "View all departments") {
        // View all departments
        db.query("SELECT * FROM department", function (err, results) {
          // Console table results
          console.table("Viewing All Departments", results);
          // Calls menu again
          menuPrompt();
        });
      } else if (data.menu === "View all roles") {
        // View all roles
        db.query(
          `SELECT role.id, role.title, department.name AS department, role.salary
          FROM role
        JOIN department ON role.department_id = department.id;`,
          function (err, results) {
            // Console table results
            console.table("Viewing All Roles", results);
            // Calls menu again
            menuPrompt();
          }
        );
      } else if (data.menu === "View all employees") {
        // View all employees
        db.query(
          `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ',m.last_name) AS manager
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id;`,
          function (err, results) {
            // Console table results
            console.table("Viewing All Employees", results);
            // Calls menu again
            menuPrompt();
          }
        );
      } else if (data.menu === "Add a department") {
        // Calls the addDepartment function
        addDepartment();
      } else if (data.menu === "Add a role") {
        // Calls the add role function
        addRole();
      } else if (data.menu === "Add an employee") {
        // Calls the add employee function
        addEmployee();
      } else if (data.menu === "Update an employee role") {
        // Calls the update role function
        updateRole();
      } else {
        //  Exit app here
        console.log("Exiting...");
        return false;
      }
    });
}

// Add department function
function addDepartment() {
  console.log("Add a department...");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department name?",
      },
    ])
    .then((data) => {
      // Inserts into department table variable
      const sql = `INSERT INTO department (name)
      VALUES (?)`;
      // Values
      const values = [data.name];
      // Queries the data to the SQL table
      db.query(sql, [values], function (err, results) {
        console.log(results);
        // Calls menu prompt again
        menuPrompt();
      });
    });
}

// Add role function
function addRole() {
  const choiceArr = [];
  console.log("Add a role...");
  db.query("SELECT * FROM department", function (err, results) {
    // "Engineering", "Management", "HR", "IT"
    for (let i = 0; i < results.length; i++) {
      choiceArr.push(results[i].name);
    }
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the roles title?",
        },
        {
          type: "number",
          name: "salary",
          message: "What is the roles salary?",
        },
        {
          type: "list",
          name: "department",
          message: "What department does the role belong to??",
          choices: choiceArr,
        },
      ])
      .then((data) => {
        // Insert into role variable
        const sql = `INSERT INTO role (title, salary, department_id)
      VALUES (?)`;
        // Values in variable
        const values = [data.title, data.salary, data.department];
        console.log(values);
        // Queries the values stored in variables
        db.query(sql, [values], function (err, results) {
          console.log(results);
          // Calls menu prompt again
          menuPrompt();
        });
      });
  });
}

// Add employee function
function addEmployee() {
  console.log("Add a employee...");
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee last name?",
      },
      {
        type: "input",
        name: "role",
        message: "What is the employee's role",
      },
      {
        type: "input",
        name: "manager",
        message: "Who is the employee's manager?",
      },
    ])
    .then((data) => {
      // Insert into employee variable
      const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
      VALUES (?)`;

      // Values variable
      const values = [data.first_name, data.last_name, data.role, data.manager];
      console.log(values);
      // Queries to the SQL table
      db.query(sql, [values], function (err, results) {
        console.log(results);
        // Calls prompt again
        menuPrompt();
      });
    });
}

// Update role function
function updateRole() {
  console.log("Update an employee...");
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee last name?",
      },
      {
        type: "number",
        name: "role",
        message: "What is the employee's new role",
      },
    ])
    .then((data) => {
      // UPDATE employe variable
      const sql = `UPDATE employee
      SET role_id = ?
      WHERE first_name = ?`;

      // Role variable
      const role = [data.role];

      // Name variable
      const name = [data.first_name];
      // Queries the SQL table and updates based on the values
      db.query(sql, [role, name], function (err, results) {
        console.log(results);
        // Call menu prompt again
        menuPrompt();
      });
    });
}

// Function to call initial prompt when app is started
function init() {
  menuPrompt();
}
init();
