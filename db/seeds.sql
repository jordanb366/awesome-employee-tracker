-- Inserts values into department table
INSERT INTO department (id, name)
VALUES (1, "Engineering"),
       (2, "Management"),
       (3, "HR"),
       (4, "IT");
-- Inserts values into role table
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Engineer", 60000, 1),
       (2,"Manager", 70000, 2),
       (3,"Human Resources", 50000, 3),
       (4,"Help Desk", 40000, 4);

-- Inserts values into employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Bob", "Jones", 2, null),
       (2,"John", "Deere", 1, 1),
       (3,"Joe", "Jacob", 3, 1),
       (4, "Rob", "Smith", 4, 1);