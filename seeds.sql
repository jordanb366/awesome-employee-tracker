INSERT INTO department (id, name)
VALUES (2, "Engineering"),
       (4, "Management"),
       (3, "HR"),
       (1, "HelpDesk");

INSERT INTO role (department_id, title, salary)
VALUES (2, "Engineer", 3.3),
       (4,"HR", 4.4),
       (3,"Manager", 5.5),
       (1,"Manager", 6.6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Bob", "Jones", 2, 2),
       (4,"John", "Deere",4, 4),
       (3,"Joe", "Jacob", 3, 3),
       (1, "Rob", "Smith", 3, 3);