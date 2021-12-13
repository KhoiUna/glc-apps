CREATE TABLE events
(
    id serial NOT NULL,
    created_at DATE NOT NULL,
    status CHAR(6),
    PRIMARY KEY (id)
);