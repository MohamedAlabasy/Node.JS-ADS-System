/* Replace with your SQL commands */
CREATE TABLE reset_password (
    id SERIAL PRIMARY KEY,
    code VARCHAR(6) NOT NULL,
    created_at DATE NOT NULL,
    expire_at DATE NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL
);