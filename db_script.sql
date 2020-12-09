CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    review TEXT NOT NULL,
    review_date TEXT NOT NULL);


