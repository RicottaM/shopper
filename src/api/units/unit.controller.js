import { unitService } from './unit.service.js';

export const unitController = {
  getAll: async (req, res, next) => {
    try {
      const units = await unitService.getAll();

      res.json(units);
    } catch (error) {
      next(error);
    }
  },
};
