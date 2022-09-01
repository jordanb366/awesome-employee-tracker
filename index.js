// require("dotenv").config();
// const mysql = require("mysql2/promise");
const chalk = require("chalk");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consleTable = require("console.table");
const res = require("express/lib/response");
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
        ],
      },
    ])
    .then((data) => {
      //   Gets the data to...
      //   Conditionals statements for the prompts menu
      // if () {
      //   console.log("Test3");
      //   // Do something
      // } else if ("Test2") {
      //   console.log();
      //   // Do something
      // } else {
      //   return false;
      // }\
      // console.table([
      //   {
      //     name: "foo",
      //     age: 10,
      //   },
      //   {
      //     name: "bar",
      //     age: 20,
      //   },
      // ]);
      db.query("SELECT * FROM department", function (err, results) {
        console.log(results);
        console.table([
          {
            Id: results[1].id,
            Role: results[1].name,
          },
        ]);
      });
    });
}

// Function to call initial prompt when app is started
function init() {
  menuPrompt();
}
init();
