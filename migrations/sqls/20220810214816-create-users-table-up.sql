/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) ,
    last_name VARCHAR(100) ,
    password VARCHAR NOT NULL,
    is_verification BOOLEAN DEFAULT FALSE,
    is_owner BOOLEAN DEFAULT FALSE,
    token VARCHAR
);