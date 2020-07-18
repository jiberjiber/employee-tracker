CREATE DATABASE IF NOT EXISTS employee_db;

CREATE TABLE IF NOT EXISTS `employee_db`.`department` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `employee_db`.`role` (
	`id` INT NOT NULL auto_increment,
    `title` VARCHAR(30) NOT NULL,
    `salary` DECIMAL NOT NULL,
    `department_id` INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) references department(id)
);

CREATE TABLE IF NOT EXISTS `employee_db`.`employee` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(30) NOT NULL,
	`last_name` VARCHAR(30) NOT NULL,
	`role_id` INT NOT NULL,
	`manager_id` INT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (manager_id) REFERENCES employee(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);