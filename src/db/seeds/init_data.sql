INSERT INTO categories (category_name) VALUES
    ('Electronics'),
    ('Apparel'),
    ('Home & Kitchen'),
    ('Books'),
    ('Sports'),
    ('Toys'),
    ('Beauty'),
    ('Automotive'),
    ('Health'),
    ('Grocery');

INSERT INTO units (unit_name, unit_symbol) VALUES
    ('Piece', 'pcs'),
    ('Set', 'set'),
    ('Kilogram', 'kg'),
    ('Liter', 'L'),
    ('Meter', 'm'),
    ('Pair', 'pair'),
    ('Box', 'box'),
    ('Dozen', 'doz'),
    ('Pack', 'pack'),
    ('Bundle', 'bundle');

INSERT INTO products (name, description, price, category_id, availability, unit_id) VALUES
    ('Smartphone', 'Latest model with advanced features', 999.99, 1, 'Available', 1),
    ('T-shirt', '100% cotton, assorted colors', 19.99, 2, 'Available', 1),
    ('Coffee Maker', 'Programmable with built-in grinder', 49.99, 3, 'Available', 1),
    ('Python Programming', 'Comprehensive guide for beginners', 29.99, 4, 'Available', 4),
    ('Soccer Ball', 'Official size and weight', 14.99, 5, 'Available', 1),
    ('LEGO Set', 'Creative building blocks for kids', 39.99, 6, 'Available', 6),
    ('Shampoo', 'Moisturizing formula for all hair types', 9.99, 7, 'Available', 1),
    ('Car Battery', 'High-performance battery for various models', 89.99, 8, 'Available', 1),
    ('Vitamin C Supplement', 'Boosts immune system, 1000mg', 12.99, 9, 'Available', 1),
    ('Whole Wheat Bread', 'Healthy choice for daily nutrition', 2.99, 10, 'Available', 1);

INSERT INTO users (email, password, first_name, last_name) VALUES
    ('john@example.com', 'password123', 'John', 'Doe'),
    ('jane@example.com', 'letmein', 'Jane', 'Smith'),
    ('admin@example.com', 'adminpass', 'Admin', 'Admin'),
    ('alice@example.com', 'alicepass', 'Alice', 'Johnson'),
    ('bob@example.com', 'bobpass', 'Bob', 'Williams'),
    ('sarah@example.com', 'sarahpass', 'Sarah', 'Davis'),
    ('tom@example.com', 'tompass', 'Tom', 'Taylor'),
    ('emily@example.com', 'emilypass', 'Emily', 'Brown'),
    ('michael@example.com', 'michaelpass', 'Michael', 'Jones'),
    ('lisa@example.com', 'lisapass', 'Lisa', 'Wilson');

INSERT INTO carts (user_id, creation_date) VALUES
    (1, CURRENT_TIMESTAMP),
    (2, CURRENT_TIMESTAMP),
    (3, CURRENT_TIMESTAMP),
    (4, CURRENT_TIMESTAMP),
    (5, CURRENT_TIMESTAMP),
    (6, CURRENT_TIMESTAMP),
    (7, CURRENT_TIMESTAMP),
    (8, CURRENT_TIMESTAMP),
    (9, CURRENT_TIMESTAMP),
    (10, CURRENT_TIMESTAMP);

INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
    (1, 1, 2),
    (2, 3, 1),
    (3, 5, 3),
    (4, 7, 1),
    (5, 9, 2),
    (6, 2, 1),
    (7, 4, 1),
    (8, 6, 1),
    (9, 8, 1),
    (10, 10, 2);


INSERT INTO product_locations (product_id, location_id) VALUES
    (1, 1), 
    (2, 2), 
    (3, 3), 
    (4, 4), 
    (5, 5), 
    (6, 6), 
    (7, 7), 
    (8, 8), 
    (9, 9), 
    (10, 10);


INSERT INTO locations (location_name, location_x, location_y, location_category_id) VALUES 
('Aisle 1', 10, 20, 3), 
('Aisle 2', 15, 25, 3), 
('Aisle 3', 20, 30, 3), 
('Aisle 4', 25, 35, 3), 
('Aisle 5', 30, 40, 3), 
('Aisle 6', 35, 45, 3), 
('Aisle 7', 40, 50, 3), 
('Aisle 8', 45, 55, 3), 
('Aisle 9', 50, 60, 3), 
('Aisle 10', 55, 65, 3);