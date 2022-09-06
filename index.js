// require("dotenv").config();
// const mysql = require("mysql2/promise");
const chalk = require("chalk");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consleTable = require("console.table");
const res = require("express/lib/response");
const { default: prompt } = require("inquirer/lib/ui/prompt");
// const dbConfig = require("./config/dbConfig");

// async function main() {
//   console.info(chalk.blue("=".repeat(30)));
//   console.info(chalk.blue("Connecting to database..."));
//   const dbConnection = await dbConfig();
//   console.info(chalk.blue("Connected to database!"));

//   console.log(dbConnection);
// }
// main();
// console.log(process.env);

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
        db.query("SELECT * FROM department", function (err, results) {
          console.table("Viewing All Departments", results);
          menuPrompt();
        });
      } else if (data.menu === "View all roles") {
        db.query(
          `SELECT role.id, role.title, department.name AS department, role.salary
          FROM role
        JOIN department ON role.department_id = department.id;`,
          function (err, results) {
            console.table("Viewing All Roles", results);
            menuPrompt();
          }
        );
      } else if (data.menu === "View all employees") {
        db.query(
          `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ',m.last_name) AS manager
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id;`,
          function (err, results) {
            console.table("Viewing All Employees", results);
            menuPrompt();
          }
        );
      } else if (data.menu === "Add a department") {
        addDepartment();
      } else if (data.menu === "Add a role") {
        addRole();
      } else if (data.menu === "Add an employee") {
        addEmployee();
      } else {
        //  Exit app here
        console.log("Exiting...");
      }
    });
}

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
      const sql = `INSERT INTO department (id, name)
      VALUES (?)`;

      const values = [data.name];

      db.query(sql, [values], function (err, results) {
        console.log(results);
        menuPrompt();
      });
    });
}

function addRole() {
  console.log("Add a role...");
  db.query("SELECT * FROM department", function (err, results) {});
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
        choices: [results],
      },
    ])
    .then((data) => {
      const sql = `INSERT INTO role (title, salary)
      VALUES (?)`;

      const values = [data.title, data.salary];

      db.query(sql, [values], function (err, results) {
        console.log(results);
        menuPrompt();
      });
    });
}

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
      const sql = `INSERT INTO employee (first_name, last_name)
      VALUES (?)`;

      const values = [data.first_name, data.last_name];
      console.log(values);
      db.query(sql, [values], function (err, results) {
        console.log(results);
        menuPrompt();
      });
    });
}

// Function to call initial prompt when app is started
function init() {
  menuPrompt();
}
init();

// SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, e.manager_id,
//         FROM employee e
//         JOIN role ON employee.role_id = role.id
//         JOIN department ON role.department_id = department.id
//         INNER JOIN employee m ON e.manager_id = m.id;
