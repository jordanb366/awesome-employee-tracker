-- Inserts values into department table
INSERT INTO department (name)
VALUES ("Engineering"),
       ("Management"),
       ("HR"),
       ("IT");
-- Inserts values into role table
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 60000, 1),
       ("Manager", 70000, 2),
       ("Human Resources", 50000, 3),
       ("Help Desk", 40000, 4);

-- Inserts values into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Jones", 2, null),
       ("John", "Deere", 1, 1),
       ("Joe", "Jacob", 3, 1),
       ("Rob", "Smith", 4, 1);