-- Drop database if already exists
DROP DATABASE IF EXISTS employee_db;
-- Creates database
CREATE DATABASE employee_db;

-- Selects database to use
USE employee_db;

-- Creates department table
CREATE TABLE department (
  -- Creates id and name
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Creates role table
CREATE TABLE role (
  -- Creates id, title, salary, department_id with foreign key and reference
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

-- Creates employee table
CREATE TABLE employee (
   -- Creates id, title, salary, department_id with foreign key and reference
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
);

--  AUTO_INCREMENT PRIMARY KEY

