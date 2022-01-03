CREATE TABLE students
(
    id serial NOT NULL,
    full_name VARCHAR(255) NOT NULL UNIQUE,    
    PRIMARY KEY (id)
);