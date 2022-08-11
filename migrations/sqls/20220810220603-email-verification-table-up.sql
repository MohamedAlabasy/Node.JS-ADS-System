/* Replace with your SQL commands */
CREATE TABLE email_verification (
    id SERIAL PRIMARY KEY,
    code VARCHAR(6) NOT NULL,
    created_at timestamp NOT NULL,
    expire_at timestamp NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL
);