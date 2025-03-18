CREATE DATABASE memberdb;
USE memberdb;

create table members (
	id int auto_increment primary key,
    username varchar(20) not null,
    email varchar(100) not null unique,
    pw varchar(255) not null,
    created_at timestamp default current_timestamp
);

show tables;
DESC members;

INSERT INTO members (username, email, pw) 
VALUES ("admin", "example@example.com", "1234");

DELETE FROM members
WHERE username = 'admin';

SELECT * FROM members;
