INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 50000, 1),
       ("Lead Engineer", 170000, 2),
       ("Software Engineer", 100000, 2),
       ("Account Manager", 180000, 3),
       ("Accountant", 115000, 3),
       ("Legal Team Lead", 300000, 4),
       ("Lawyer", 150000, 4);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Trevor", "Triffo", 1, NULL),
       ("Ben", "Triffo", 2, NULL),
       ("Julian", "Triffo", 3, NULL),
       ("Laura", "Campbell", 4, NULL),
       ("Micayla", "Paterno", 5, NULL),
       ("Grace", "Rumbaut", 6, NULL),
       ("Thea", "Simic", 7, NULL);