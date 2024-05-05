import { client } from '../../db/connect.js';
import { ErrorWithStatus } from '../../error/error-with-status.js';

export const cartService = {
  getAll: async () => {
    const carts = await client.query(`SELECT * FROM carts;`);

    if (!carts.rows.length) {
      throw new ErrorWithStatus(`Couldn't find any cart.`, 404);
    }

    return carts.rows;
  },
  getById: async (id) => {
    const cart = await client.query(`SELECT * FROM carts WHERE cart_id = ${id};`);

    if (!cart.rows.length) {
      throw new ErrorWithStatus(`Couldn't find any cart with given id: ${id}.`, 404);
    }

    return cart.rows;
  },
  create: async (newCart) => {
    const cart = await client.query(
      `INSERT INTO carts (user_id, creation_date) VALUES (${newCart.user_id}, CURRENT_TIMESTAMP);`
    );

    if (!cart.rows.length) {
      throw new ErrorWithStatus(`Couldn't create new cart with given data:\n${newCart}`, 400);
    }

    return {
      message: 'Cart has been successfully created.',
    };
  },
  update: async (updatedCart, id) => {
    const { user_id, creation_date } = updatedCart;
    let updatedFields = [];

    if (user_id) updatedFields.push(`user_id = ${user_id}`);
    if (creation_date) updatedFields.push(`creation_date = '${creation_date}'`);

    const updateQuery = `UPDATE carts SET ${updatedFields.join(', ')} WHERE cart_id = ${id};`;

    const cart = await client.query(updateQuery);

    if (!cart.rows.length) {
      throw new ErrorWithStatus(`Couldn't find cart with given id: ${id}.`, 404);
    }

    return {
      message: 'Cart has been successfully updated.',
    };
  },
  delete: async (id) => {
    const cart = await client.query(`DELETE FROM carts WHERE cart_id = ${id};`);

    if (!cart.rows.length) {
      throw new ErrorWithStatus(`Couldn't find cart with given id: ${id}.`, 404);
    }

    return {
      message: 'Cart has been successfully deleted.',
    };
  },
  getCartItems: async (cartId) => {
    const cartItems = await client.query(`SELECT * FROM cart_items WHERE cart_id = ${cartId};`);

    if (!cartItems.rows.length) {
      throw new ErrorWithStatus(`Couldn't find any cart items for cart with id: ${cartId}.`, 404);
    }

    return cartItems.rows;
  },
  addCartItem: async (cartId, newCartItem) => {
    const { product_id, quantity } = newCartItem;

    const cartItem = await client.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (${cartId}, ${product_id}, ${quantity});`
    );

    if (!cartItem.rows.length) {
      throw new ErrorWithStatus(`Couldn't add new cart item with given data:\n${newCartItem}`, 400);
    }

    return {
      message: 'Cart item has been successfully added.',
    };
  },
  updateCartItem: async (cartItemId, updatedCartItem) => {
    const { product_id, quantity } = updatedCartItem;
    let updatedFields = [];

    if (product_id) updatedFields.push(`product_id = ${product_id}`);
    if (quantity) updatedFields.push(`quantity = ${quantity}`);

    const updateQuery = `UPDATE cart_items SET ${updatedFields.join(', ')} WHERE cart_item_id = ${cartItemId};`;

    const cartItem = await client.query(updateQuery);

    if (!cartItem.rows.length) {
      throw new ErrorWithStatus(`Couldn't find cart item with given id: ${cartItemId}.`, 404);
    }

    return {
      message: 'Cart item has been successfully updated.',
    };
  },
  deleteCartItem: async (cartItemId) => {
    const cartItem = await client.query(`DELETE FROM cart_items WHERE cart_item_id = ${cartItemId};`);

    if (!cartItem.rows.length) {
      throw new ErrorWithStatus(`Couldn't find cart item with given id: ${cartItemId}.`, 404);
    }

    return {
      message: 'Cart item has been successfully deleted.',
    };
  },
};
