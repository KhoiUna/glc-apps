CREATE TABLE reservations
(
    id serial NOT NULL,
    student_id INT NOT NULL,
    number_of_people INT NOT NULL,
    selected_date DATE NOT NULL,
    time_slot INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(student_id) REFERENCES students(id)
);