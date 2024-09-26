import { client } from '../../db/connect.js';
import { ErrorWithStatus } from '../../error/error-with-status.js';

export const unitService = {
  getAll: async () => {
    const units = await client.query(`SELECT * FROM units;`);

    if (!units.rows.length) {
      throw new ErrorWithStatus(`Couldn't find any unit.`, 404);
    }

    return units.rows;
  },
};
