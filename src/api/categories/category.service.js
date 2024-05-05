import { client } from '../../db/connect.js';
import { ErrorWithStatus } from '../../error/error-with-status.js';

export const categoryService = {
    getAll: async () => {
        const categories = await client.query(`SELECT * FROM categories;`);

        if (!categories.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any category.`, 404);
        }

        return categories.rows;
    },
    getById: async (id) => {
        const category = await client.query(`SELECT * FROM categories WHERE category_id = ${id};`);

        if (!category.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any category with given id: ${id}.`, 404);
        }

        return category.rows;
    },
    create: async (newCategory) => {
        const category = await client.query(
            `INSERT INTO categories (name) VALUES ('${newCategory.name}');`
        );

        if (!category.rows.length) {
            throw new ErrorWithStatus(`Couldn't create new category with given data:\n${newCategory}`, 400);
        }

        return {
            message: 'Category has been successfully created.',
        };
    },
    update: async (updatedCategory, id) => {
        const { name } = updatedCategory;
        let updatedFields = [];

        if (name) updatedFields.push(`name = '${name}'`);

        const updateQuery = `UPDATE categories SET ${updatedFields.join(', ')} WHERE category_id = ${id};`;

        const category = await client.query(updateQuery);

        if (!category.rows.length) {
            throw new ErrorWithStatus(`Couldn't find category with given id: ${id}.`, 404);
        }

        return {
            message: 'Category has been successfully updated.',
        };
    },
    delete: async (id) => {
        const category = await client.query(`DELETE FROM categories WHERE category_id = ${id};`);

        if (!category.rows.length) {
            throw new ErrorWithStatus(`Couldn't find category with given id: ${id}.`, 404);
        }

        return {
            message: 'Category has been successfully deleted.',
        };
    },
};
