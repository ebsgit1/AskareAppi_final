CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS Tasks (
    task_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    room VARCHAR(255) NULL,
    description TEXT,
    frequency INT NULL,
    due_date DATE,
    status VARCHAR(50) CHECK (status IN ('not done', 'completed')) DEFAULT 'not done',
    user_id INT REFERENCES Users(user_id),
    completion_date DATE NULL
);

CREATE TABLE IF NOT EXISTS Settings (
    setting_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    preference_key VARCHAR(255) NOT NULL,
    preference_value TEXT
);
