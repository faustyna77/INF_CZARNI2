

CREATE TABLE Clients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(15)
);


CREATE TABLE Deceased (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_death DATE NOT NULL
);


CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES Clients(id) ON DELETE CASCADE,
    deceased_id INT REFERENCES Deceased(id) ON DELETE CASCADE,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
