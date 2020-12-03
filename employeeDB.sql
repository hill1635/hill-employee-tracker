DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE people (
id INT AUTO_INCREMENT NOT NULL,
PRIMARY KEY (id),
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
title VARCHAR(50) NOT NULL,
department VARCHAR(30) NOT NULL,
salary INT NOT NULL,
manager VARCHAR(30)
);

INSERT INTO people (first_name, last_name, title, department, salary, manager)
VALUES ('Jo', 'Bennett', 'Chairman of the Board', 'Corporate', 100000, null),
('David', 'Wallace', 'CEO', 'Corporate', 75000, 'Jo Bennett'),
('Michael', 'Scott', 'Regional Manager', 'Management', 45000, 'David Wallace'),
('Dwight', 'Schrute', 'Assistant to the Regional Manager', 'Sales', 40000, 'Michael Scott'),
('Jim', 'Halpert', 'Salesperson', 'Sales', 40000, 'Michael Scott'),
('Pam', 'Beesly', 'Office Manager', 'Administration', 40000, 'Michael Scott'),
('Ryan', 'Howard', 'Admin Assistant', 'Administration', 25000, 'Michael Scott'),
('Andy', 'Bernard', 'Salesperson', 'Sales', 40000, 'Michael Scott'),
('Stanley', 'Hudson', 'Salesperson', 'Sales', 40000, 'Michael Scott'),
('Phyllis', 'Vance', 'Salesperson', 'Sales', 40000, 'Michael Scott'),
('Angela', 'Martin', 'Accountant', 'Accounting', 40000, 'Michael Scott'),
('Oscar', 'Martinez', 'Accountant', 'Accounting', 40000, 'Michael Scott'),
('Kevin', 'Malone', 'Accountant', 'Accounting', 40000, 'Michael Scott'),
('Toby', 'Flenderson', 'HR Representative', 'Human Resources', 35000, 'Michael Scott'),
('Gabe', 'Lewis', 'Coordinating Director of Emerging Regions', 'Corporate', 35000, 'David Wallace'),
('Holly', 'Flax', 'HR Representative', 'Human Resources', 35000, 'Michael Scott'),
('Kelly', 'Kapoor', 'Customer Service Representative', 'Customer Service', 35000, 'Michael Scott'),
('Creed', 'Bratton', 'Quabbity Assuance', 'Quality Assurance', 35000, 'Michael Scott');