CREATE TYPE menu_category AS ENUM('Regular Drinks', 'Frappe', 'Shimmer Juices', 'Premium Drinks', 'Rice Coffee Series');
CREATE TYPE menu_temp AS ENUM('Hot', 'Cold', 'Both');

CREATE TABLE menuItems(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category menu_category NOT NULL,
    temperature menu_temp DEFAULT 'Cold',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);