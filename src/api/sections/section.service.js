import { client } from '../../db/connect.js';
import { ErrorWithStatus } from '../../error/error-with-status.js';

export const sectionService = {
    getAll: async () => {
        const sections = await client.query(`SELECT * FROM sections;`);

        if (!sections.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any section.`, 404);
        }

        return sections.rows;
    },
    getById: async (id) => {
        const section = await client.query(`SELECT * FROM sections WHERE section_id = ${id};`);

        if (!section.rows.length) {
            throw new ErrorWithStatus(`Couldn't find any section with given id: ${id}.`, 404);
        }

        return section.rows;
    },
    create: async (newSection) => {
        const section = await client.query(
            `INSERT INTO sections (name) VALUES ('${newSection.name}');`
        );

        if (!section.rows.length) {
            throw new ErrorWithStatus(`Couldn't create new section with given data:\n${newSection}`, 400);
        }

        return {
            message: 'Section has been successfully created.',
        };
    },
    update: async (updatedSection, id) => {
        const { name } = updatedSection;
        let updatedFields = [];

        if (name) updatedFields.push(`name = '${name}'`);

        const updateQuery = `UPDATE sections SET ${updatedFields.join(', ')} WHERE section_id = ${id};`;

        const section = await client.query(updateQuery);

        if (!section.rows.length) {
            throw new ErrorWithStatus(`Couldn't find section with given id: ${id}.`, 404);
        }

        return {
            message: 'Section has been successfully updated.',
        };
    },
    delete: async (id) => {
        const section = await client.query(`DELETE FROM sections WHERE section_id = ${id};`);

        if (!section.rows.length) {
            throw new ErrorWithStatus(`Couldn't find section with given id: ${id}.`, 404);
        }

        return {
            message: 'Section has been successfully deleted.',
        };
    },
};
