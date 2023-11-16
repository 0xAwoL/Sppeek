CREATE TABLE USERS(
    user_id serial PRIMARY KEY,
    username varchar(50) UNIQUE NOT NULL,
    hash varchar(300) NOT NULL,
    verified BOOLEAN,
    verifyHash varchar(300),
    resetToken varchar(300),
    email varchar(50) UNIQUE NOT NULL,
    session varchar(300),
    created_on DATE
);
