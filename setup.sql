DROP DATABASE IF EXISTS employee_db;
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
("Accounting");

INSERT INTO employee_db.roles (id, title, salary, department_id) VALUES 
(1, "Owner", 100.00, 1),
(2, "Accountant", 50.00, 2);


INSERT INTO employee_db.employees VALUES
(1, "Evan", "Boswood", 1, null),
(2, "Ruby", "Leigh", 2, null);