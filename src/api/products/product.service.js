import { client } from '../../db/connect.js';
import { ErrorWithStatus } from '../../error/error-with-status.js';

export const productService = {
    getAll: async () => {
        const products = await client.query(`SELECT * FROM products;`);

        if (!products.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any product.`, 404);
        }

        return products.rows;
    },
    getById: async (id) => {
        const product = await client.query(`SELECT * FROM products WHERE product_id = ${id};`);

        if (!product.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any product with given id: ${id}.`, 404);
        }

        return product.rows;
    },
    create: async (newProduct) => {
        const product = await client.query(
            `INSERT INTO products (name, price, description, category_id, availability, unit_id) VALUES ('${newProduct.name}', ${newProduct.price}, '${newProduct.description}', ${newProduct.category_id}, ${newProduct.availability}, ${newProduct.cart_id});`
        );

        if (!product.rows.length) {
            throw new ErrorWithStatus(`Couldn't create new product with given data:\n${newProduct}`, 400);
        }

        return {
            message: 'Product has been successfully created.',
        };
    },
    update: async (updatedProduct, id) => {
        const { name, price, description, category_id, availability, unit_id } = updatedProduct;
        let updatedFields = [];

        if (name) updatedFields.push(`name = '${name}'`);
        if (price) updatedFields.push(`price = ${price}`);
        if (description) updatedFields.push(`description = '${description}'`);
        if (category_id) updatedFields.push(`category_id = ${category_id}`);
        if (availability) updatedFields.push(`availability = ${availability}`);
        if (unit_id) updatedFields.push(`unit_id = ${unit_id}`);

        const updateQuery = `UPDATE products SET ${updatedFields.join(', ')} WHERE product_id = ${id};`;

        const product = await client.query(updateQuery);

        if (!product.rows.length) {
            throw new ErrorWithStatus(`Couldn't find product with given id: ${id}.`, 404);
        }

        return {
            message: 'Product has been successfully updated.',
        };
    },
    delete: async (id) => {
        const product = await client.query(`DELETE FROM products WHERE product_id = ${id};`);

        if (!product.rows.length) {
            throw new ErrorWithStatus(`Couldn't find product with given id: ${id}.`, 404);
        }

        return {
            message: 'Product has been successfully deleted.',
        };
    },
    getByCategoryId: async (categoryId) => {
        const products = await client.query(`SELECT * FROM products WHERE category_id = ${categoryId};`);

        if (!products.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any product with given category id: ${categoryId}.`, 404);
        }

        return products.rows;
    },
    getProductLocation: async (productId) => {
        const location = await client.query(`SELECT * FROM product_location WHERE product_id = ${productId};`);

        if (!location.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any location for product with given id: ${productId}.`, 404);
        }

        return location.rows;
    }
};
