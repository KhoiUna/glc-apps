CREATE TABLE events
(
    id serial NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    status CHAR(7) NOT NULL,
    sql_created_at DATE NOT NULL,
    PRIMARY KEY (id)
);