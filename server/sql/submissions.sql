CREATE TABLE submissions
(
    id serial NOT NULL,
    submitted_at VARCHAR(255) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    status CHAR(8) NOT NULL,
    event_id INT NOT NULL,    
    student_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(event_id) REFERENCES events(id)
);