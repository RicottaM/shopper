-- Sections (20 examples)
INSERT INTO sections (section_name) VALUES
('Produce'), ('Dairy'), ('Bakery'), ('Meat & Seafood'), ('Frozen Foods'),
('Beverages'), ('Snacks'), ('Household'), ('Personal Care'), ('Pet Supplies'),
('Canned & Jarred'), ('Condiments & Sauces'), ('Grains & Pasta'), ('Baking Supplies'), ('International Foods'),
('Health & Wellness'), ('Baby Care'), ('Office Supplies'), ('Electronics'), ('Outdoor Living');

-- Units (10 examples)
INSERT INTO units (unit_name, unit_symbol) VALUES
('Piece', 'pc'), ('Pound', 'lb'), ('Ounce', 'oz'), ('Gram', 'g'), ('Kilogram', 'kg'),
('Liter', 'L'), ('Milliliter', 'mL'), ('Gallon', 'gal'), ('Count', 'ct'), ('Pack', 'pk');

-- Categories (30 examples)
INSERT INTO categories (category_name, section_id) VALUES
('Fruits', 1), ('Vegetables', 1), ('Organic Produce', 1), ('Exotic Fruits', 1), ('Fresh Herbs', 1),
('Milk & Eggs', 2), ('Cheese', 2), ('Yogurt', 2), ('Butter & Margarine', 2), ('Cream & Creamer', 2),
('Bread', 3), ('Pastries', 3), ('Cakes', 3), ('Cookies', 3), ('Pies & Tarts', 3),
('Beef', 4), ('Poultry', 4), ('Seafood', 4), ('Pork', 4), ('Deli Meats', 4),
('Frozen Meals', 5), ('Frozen Desserts', 5), ('Frozen Vegetables', 5), ('Frozen Fruits', 5), ('Ice Cream', 5),
('Juice', 6), ('Soda', 6), ('Water', 6), ('Coffee & Tea', 6), ('Energy Drinks', 6);

-- Products (40 examples)
INSERT INTO products (name, description, price, category_id, availability, amount, unit_id) VALUES
('Apples', 'Fresh Gala Apples', 2.99, 1, 'In Stock', 10, 2),
('Bananas', 'Ripe Yellow Bananas', 0.79, 1, 'In Stock', 20, 2),
('Oranges', 'Juicy Navel Oranges', 3.49, 1, 'In Stock', 15, 2),
('Grapes', 'Red Seedless Grapes', 4.99, 1, 'In Stock', 5, 2),
('Strawberries', 'Fresh Strawberries', 5.99, 1, 'In Stock', 2, 1),
('Carrots', 'Whole Carrots', 1.99, 2, 'In Stock', 10, 3),
('Broccoli', 'Fresh Broccoli Crowns', 2.49, 2, 'In Stock', 8, 2),
('Spinach', 'Baby Spinach Leaves', 3.99, 2, 'In Stock', 6, 1),
('Tomatoes', 'Vine-Ripened Tomatoes', 2.99, 2, 'In Stock', 12, 2),
('Zucchini', 'Fresh Zucchini', 1.49, 2, 'In Stock', 15, 2),
('Whole Milk', 'Pasteurized Whole Milk', 3.99, 6, 'In Stock', 20, 6),
('Cheddar Cheese', 'Sharp Cheddar Cheese', 4.99, 7, 'In Stock', 10, 2),
('Greek Yogurt', 'Plain Greek Yogurt', 2.99, 8, 'In Stock', 15, 6),
('Butter', 'Unsalted Butter', 3.49, 9, 'In Stock', 12, 2),
('Sour Cream', 'Full-Fat Sour Cream', 2.29, 10, 'In Stock', 8, 6),
('Sourdough Bread', 'Artisan Sourdough Bread', 5.99, 11, 'In Stock', 6, 1),
('Croissants', 'Buttery Croissants', 3.99, 12, 'In Stock', 10, 4),
('Chocolate Cake', 'Moist Chocolate Cake', 19.99, 13, 'In Stock', 2, 1),
('Peanut Butter Cookies', 'Homemade Peanut Butter Cookies', 4.99, 14, 'In Stock', 20, 4),
('Apple Pie', 'Fresh-Baked Apple Pie', 12.99, 15, 'In Stock', 4, 1),
('Ground Beef', 'Lean Ground Beef', 6.99, 16, 'In Stock', 8, 2),
('Chicken Breasts', 'Boneless, Skinless Chicken Breasts', 4.99, 17, 'In Stock', 12, 2),
('Salmon Fillets', 'Fresh Atlantic Salmon Fillets', 9.99, 18, 'In Stock', 6, 2),
('Pork Chops', 'Bone-In Pork Chops', 7.49, 19, 'In Stock', 10, 2),
('Turkey Slices', 'Smoked Turkey Deli Slices', 5.99, 20, 'In Stock', 8, 2),
('Frozen Pizza', 'Pepperoni Frozen Pizza', 6.99, 21, 'In Stock', 15, 1),
('Ice Cream Sandwiches', 'Vanilla Ice Cream Sandwiches', 4.99, 22, 'In Stock', 20, 4),
('Mixed Vegetables', 'Frozen Mixed Vegetables', 3.49, 23, 'In Stock', 10, 2),
('Strawberry Smoothie', 'Frozen Strawberry Smoothie', 2.99, 24, 'In Stock', 12, 6),
('Vanilla Ice Cream', 'Premium Vanilla Ice Cream', 5.99, 25, 'In Stock', 8, 1),
('Orange Juice', 'Pulp-Free Orange Juice', 3.99, 26, 'In Stock', 16, 6),
('Cola', 'Classic Cola Soda', 1.99, 27, 'In Stock', 24, 6),
('Bottled Water', 'Purified Drinking Water', 2.49, 28, 'In Stock', 30, 6),
('Coffee Beans', 'Whole Bean Coffee', 8.99, 29, 'In Stock', 6, 2),
('Energy Drink', 'Citrus-Flavored Energy Drink', 2.79, 30, 'In Stock', 18, 6);

-- Users (5 examples)
INSERT INTO users (email, password, first_name, last_name) VALUES
('john.doe@example.com', 'password123', 'John', 'Doe'),
('jane.smith@example.com', 'qwerty456', 'Jane', 'Smith'),
('michael.johnson@example.com', 'abc123', 'Michael', 'Johnson'),
('emily.davis@example.com', 'pass321', 'Emily', 'Davis'),
('robert.wilson@example.com', 'secure123', 'Robert', 'Wilson');

-- Carts (5 examples)
INSERT INTO carts (user_id) VALUES
(1), (2), (3), (4), (5);

-- Cart Items (50 examples)
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(1, 1, 3), (1, 2, 1), (1, 6, 2), (1, 11, 1), (1, 16, 1),
(2, 3, 2), (2, 7, 1), (2, 12, 1), (2, 17, 2), (2, 22, 1),
(3, 4, 1), (3, 8, 1), (3, 13, 2), (3, 18, 1), (3, 23, 1),
(4, 5, 1), (4, 9, 2), (4, 14, 3), (4, 19, 1), (4, 24, 2),
(5, 10, 1), (5, 15, 1), (5, 20, 2), (5, 25, 1), (5, 26, 2),
(1, 27, 4), (1, 28, 1), (1, 29, 2), (1, 1, 3), (2, 21, 1),
(2, 1, 2), (2, 1, 1), (2, 1, 1), (3, 1, 2), (3, 1, 1),
(3, 36, 3), (4, 1, 1), (4, 1, 2), (4, 1, 1), (5, 1, 2),
(5, 1, 2), (5, 6, 1), (1, 11, 1), (1, 16, 2), (2, 21, 1),
(2, 26, 1), (3, 1, 1), (3, 36, 2), (4, 5, 2), (4, 10, 1);