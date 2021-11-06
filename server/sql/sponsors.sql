CREATE TABLE sponsors
(
    id serial NOT NULL,
    full_name CHAR(255) NOT NULL,
    school_email TEXT NOT NULL,
    social_link TEXT,
    submitted_date date NOT NULL,
    PRIMARY KEY (id)
);