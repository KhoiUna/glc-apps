CREATE TABLE events
(
    id serial NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    status CHAR(6),
    PRIMARY KEY (id)
);