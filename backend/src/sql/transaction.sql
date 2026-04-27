CREATE TYPE transac_pay_method AS ENUM('E-Wallet', 'Cash', 'Card');
CREATE TYPE transac_status AS ENUM('Completed', 'Refunded');

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    transaction_id TEXT UNIQUE NOT NULL,
    staff_id INT REFERENCES staff(id) ON DELETE SET NULL, 
    payment_method transac_pay_method NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status transac_status DEFAULT 'Completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE transac_item_temp AS ENUM('Hot', 'Cold');

CREATE TABLE transaction_items(
    id SERIAL PRIMARY KEY,
    transaction_id INT REFERENCES transactions(id) ON DELETE CASCADE,
    menu_item_id INT REFERENCES menuItems(id),
    item_name VARCHAR(255) NOT NULL,
    size VARCHAR(20) NOT NULL,
    temperature transac_item_temp NOT NULL,
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transaction_item_addons(
    id SERIAL PRIMARY KEY,
    transac_item_id INT REFERENCES transaction_items(id) ON DELETE CASCADE,
    addon_name TEXT NOT NULL,
    addon_price DECIMAL(10, 2) DEFAULT 0.00
);