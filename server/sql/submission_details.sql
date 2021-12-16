CREATE TABLE submission_details
(
    id serial NOT NULL,
    submission_id INT NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(submission_id) REFERENCES submissions(id)
);