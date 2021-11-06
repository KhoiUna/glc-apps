CREATE TABLE feedback
(
    id serial NOT NULL,
    subject CHAR(255) NOT NULL,
    feedback TEXT NOT NULL,
    submitted_date date NOT NULL,
    PRIMARY KEY (id)
);