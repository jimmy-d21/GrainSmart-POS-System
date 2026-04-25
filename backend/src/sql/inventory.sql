CREATE TYPE inventory_cat AS ENUM(
    'Cups & Lids', 
    'Coffee', 
    'Dairy', 
    'Toppings', 
    'Syrups', 
    'Powders', 
    'Grains'
);

CREATE TYPE inventory_unit AS ENUM('pcs', 'kg', 'L');

CREATE TABLE inventory(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category inventory_cat NOT NULL,
    current_stock DECIMAL(10, 2) NOT NULL,
    unit inventory_unit NOT NULL,
    reorder_level DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);