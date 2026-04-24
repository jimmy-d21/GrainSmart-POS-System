CREATE TYPE staff_role AS ENUM('Cashier', 'Manager');
CREATE TYPE staff_status AS ENUM('Active', 'Inactive');

CREATE TABLE staff(
    id SERIAL PRIMARY KEY,
    staff_id VARCHAR(20) NOT NULL UNIQUE, -- STF-2451-4232
    image VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role staff_role DEFAULT 'Cashier',
    status staff_status DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);