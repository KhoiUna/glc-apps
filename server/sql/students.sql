CREATE TABLE students
(
    id serial NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    signature_count INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);