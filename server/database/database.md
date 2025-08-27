CREATE TABLE goals (
id INTEGER PRIMARY KEY,
account_id INTIGER,
name TEXT,
date_created DATE,
latest_commit DATE,

FOREIGN KEY (account_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE commits (
id INTEGER PRIMARY KEY,
goal_id INTEGER,
name TEXT,
date_created DATE,
commit_message TEXT,

FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
);

CREATE TABLE users (
id INTEGER PRIMARY KEY,
username TEXT,
email UNIQUE
);


-- 1) Users
INSERT INTO users (id, username, email) VALUES
(1, 'alice', 'alice@example.com'),
(2, 'bob', 'bob@example.com'),
(3, 'charlie', 'charlie@example.com');

-- 2) Goals (belonging to users)
INSERT INTO goals (id, account_id, name, date_created, latest_commit) VALUES
(1, 1, 'Learn Rust', '2025-01-01', '2025-01-03'),
(2, 1, 'Build a Web App', '2025-02-10', '2025-02-15'),
(3, 2, 'Fitness Challenge', '2025-03-05', '2025-03-07'),
(4, 3, 'Read More Books', '2025-04-01', '2025-04-04');

-- 3) Commits (belonging to goals)
INSERT INTO commits (id, goal_id, name, date_created, commit_message) VALUES
(1, 1, 'Rust Hello World', '2025-01-02', 'Printed Hello World in Rust'),
(2, 1, 'Rust Ownership', '2025-01-03', 'Learned borrow checker basics'),
(3, 2, 'Setup React', '2025-02-12', 'Created basic React app structure'),
(4, 2, 'API Integration', '2025-02-15', 'Hooked up Express backend'),
(5, 3, 'First Run', '2025-03-06', 'Ran 5 km'),
(6, 3, 'Second Run', '2025-03-07', 'Ran 6 km'),
(7, 4, 'Book 1', '2025-04-02', 'Read 50 pages of Sapiens'),
(8, 4, 'Book 2', '2025-04-04', 'Finished second book');


