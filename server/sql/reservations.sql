CREATE TABLE reservations
(
    id serial NOT NULL,
    first_name CHAR(255) NOT NULL,
    last_name CHAR(255) NOT NULL,
    number_of_people integer NOT NULL,
    selected_date date NOT NULL,
    time_slot integer NOT NULL,
    PRIMARY KEY (id)
);