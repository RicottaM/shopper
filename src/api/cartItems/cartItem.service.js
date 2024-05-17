import { client } from '../../db/connect.js';
import { ErrorWithStatus } from '../../error/error-with-status.js';

export const cartItemService = {
    getAll: async () => {
        const cartItems = await client.query(`SELECT * FROM cart_items;`);

        if (!cartItems.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any cart item.`, 404);
        }

        return cartItems.rows;
    },
    getById: async (id) => {
        const cartItem = await client.query(`SELECT * FROM cart_items WHERE cart_item_id = ${id};`);

        if (!cartItem.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any cart item with given id: ${id}.`, 404);
        }

        return cartItem.rows;
    },
    create: async (newCartItem) => {
        const cartItem = await client.query(
            `INSERT INTO cart_items (name, price, description, category_id, availability, unit_id) VALUES ('${newCartItem.name}', ${newCartItem.price}, '${newCartItem.description}', ${newCartItem.category_id}, ${newCartItem.availability}, ${newCartItem.cart_id});`
        );

        if (!cartItem.rows.length) {
            throw new ErrorWithStatus(`Couldn't create new cart item with given data:\n${newCartItem}`, 400);
        }

        return {
            message: 'Cart item has been successfully created.',
        };
    },
    update: async (updatedCartItem, id) => {
        const { product_id, quantity} = updatedCartItem;
        let updatedFields = [];

        if (product_id) updatedFields.push(`product_id = '${product_id}'`);
        if (quantity) updatedFields.push(`quantity = ${quantity}`);

        const updateQuery = `UPDATE cart_items SET ${updatedFields.join(', ')} WHERE cart_item_id = ${id};`;

        const cartItem = await client.query(updateQuery);

        if (!cartItem.rows.length) {
            throw new ErrorWithStatus(`Couldn't find cart item with given id: ${id}.`, 404);
        }

        return {
            message: 'Cart item has been successfully updated.',
        };
    },
    delete: async (id) => {
        const cartItem = await client.query(`DELETE FROM cart_items WHERE cart_item_id = ${id};`);

        if (!cartItem.rows.length) {
            throw new ErrorWithStatus(`Couldn't find cart item with given id: ${id}.`, 404);
        }

        return {
            message: 'Cart item has been successfully deleted.',
        };
    },
    getCartProducts: async (cartId) => {
        const cartItems = await client.query(`SELECT product_id FROM cart_items WHERE cart_id = ${cartId};`);

        if (!cartItems.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any cart item in cart with given id: ${cartId}.`, 404);
        }

        return cartItems.rows;
    },
};
