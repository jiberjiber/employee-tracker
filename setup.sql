DROP DATABASE employee_db;
CREATE DATABASE IF NOT EXISTS employee_db;

CREATE TABLE IF NOT EXISTS `employee_db`.`departments` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `employee_db`.`roles` (
	`id` INT NOT NULL auto_increment,
    `title` VARCHAR(30) NOT NULL,
    `salary` DECIMAL NOT NULL,
    `department_id` INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) references departments(id)
);

CREATE TABLE IF NOT EXISTS `employee_db`.`employees` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(30) NOT NULL,
	`last_name` VARCHAR(30) NOT NULL,
	`role_id` INT NOT NULL,
	`manager_id` INT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (manager_id) REFERENCES employees(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT INTO employee_db.departments (name) VALUES 
("Operations"),
("Accounting"),
("Design"),
("Installations");

INSERT INTO employee_db.roles (id, title, salary, department_id) VALUES 
(1, "Owner", 100.00, 1),
(2, "Lead Accountant", 50.00, 2),
(3, "Lighting Designer", 50.00, 3),
(4, "Site Lead", 40.00, 4),
(5, "Independent Contractor", 20.00, 4);

INSERT INTO employee_db.employees VALUES
(1, "Evan", "Boswood", 1, null),
(2, "Ruby", "Leigh", 1, null),
(3, "Taylor", "Dyer", 3, 2),
(4, "Tyson", "Ihnen", 3, 2),
(5, "Rebecca", "Gallegos", 2, 1),
(6, "Ryan", "Creager", 4, 3),
(7, "Michael", "Loa", 5, 6);