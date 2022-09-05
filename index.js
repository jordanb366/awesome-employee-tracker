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
  console.log(`Connected to the books_db database.`)
);

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
        db.query("SELECT * FROM role", function (err, results) {
          console.table("Viewing All Roles", results);
          menuPrompt();
        });
      } else if (data.menu === "View all employees") {
        db.query("SELECT * FROM employee", function (err, results) {
          console.table("Viewing All Employees", results);
          menuPrompt();
        });
      } else if (data.menu === "Add a department") {
        addDepartment();
      } else if (data.menu === "Add a role") {
        addRole();
      } else if (data.menu === "Add an employee") {
        addEmployee();
      }
      //  else {
      //   //  Exit app here
      // }
      // console.log("Exiting...");
    });
}

function addDepartment() {
  console.log("A a department...");
  inquirer
    .prompt([
      {
        type: "number",
        name: "id",
        message: "What is the department id?",
      },
      {
        type: "input",
        name: "name",
        message: "What is the department name?",
      },
    ])
    .then((data) => {
      const sql = `INSERT INTO department (id, name)
      VALUES (?)`;

      const values = [data.id, data.name];

      db.query(sql, [values], function (err, results) {
        console.log(results);
        menuPrompt();
      });
    });
}

function addRole() {
  console.log("A a role..");
  inquirer
    .prompt([
      {
        type: "number",
        name: "id",
        message: "What is the department id?",
      },
      {
        type: "input",
        name: "name",
        message: "What is the department name?",
      },
    ])
    .then((data) => {
      const sql = `INSERT INTO department (id, name)
      VALUES (?)`;

      const values = [data.id, data.name];

      db.query(sql, [values], function (err, results) {
        console.log(results);
        menuPrompt();
      });
    });
}

function addEmployee() {
  console.log("A a employee..");
  inquirer
    .prompt([
      {
        type: "number",
        name: "id",
        message: "What is the department id?",
      },
      {
        type: "input",
        name: "name",
        message: "What is the department name?",
      },
    ])
    .then((data) => {
      const sql = `INSERT INTO department (id, name)
      VALUES (?)`;

      const values = [data.id, data.name];

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
