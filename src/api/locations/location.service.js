import { client } from '../../db/connect.js';
import { ErrorWithStatus } from '../../error/error-with-status.js';

export const locationService = {
    getAll: async () => {
        const locations = await client.query(`SELECT * FROM locations;`);

        if (!locations.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any location.`, 404);
        }

        return locations.rows;
    },
    getById: async (id) => {
        const location = await client.query(`SELECT * FROM locations WHERE location_id = ${id};`);

        if (!location.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any location with given id: ${id}.`, 404);
        }

        return location.rows;
    },
    create: async (newLocation) => {
        const location = await client.query(
            `INSERT INTO locations (location_name, location_x, location_y, location_category_id) VALUES ('${newLocation.name}', ${newLocation.x}, ${newLocation.y}, ${newLocation.categoryId});`
        );

        if (!location.rows.length) {
            throw new ErrorWithStatus(`Couldn't create new location with given data:\n${newLocation}`, 400);
        }

        return {
            message: 'Location has been successfully created.',
        };
    },
    update: async (updatedLocation, id) => {
        const { name, x, y, categoryId } = updatedLocation;
        let updatedFields = [];

        if (name) updatedFields.push(`location_name = '${name}'`);
        if (x) updatedFields.push(`location_x = ${x}`);
        if (y) updatedFields.push(`location_y = ${y}`);
        if (categoryId) updatedFields.push(`location_category_id = ${categoryId}`);

        const updateQuery = `UPDATE locations SET ${updatedFields.join(', ')} WHERE location_id = ${id};`;

        const location = await client.query(updateQuery);

        if (!location.rows.length) {
            throw new ErrorWithStatus(`Couldn't find location with given id: ${id}.`, 404);
        }

        return {
            message: 'Location has been successfully updated.',
        };
    },
    delete: async (id) => {
        const location = await client.query(`DELETE FROM locations WHERE location_id = ${id};`);

        if (!location.rows.length) {
            throw new ErrorWithStatus(`Couldn't find location with given id: ${id}.`, 404);
        }

        return {
            message: 'Location has been successfully deleted.',
        };
    }
};
