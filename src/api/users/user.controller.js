import { userService } from './user.service.js';

export const userController = {
  getAll: async (req, res, next) => {
    try {
      const users = await userService.getAll();

      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const user = await userService.getById(id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const message = await userService.create(req.body);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;

      const message = await userService.update(req.body, id);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;

      const message = await userService.delete(id);

      res.json(message);
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.login(email, password);
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });

      res.json({ message: 'Logged in successfully', user });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      await userService.logout(req.user.id);
      res.clearCookie('token');
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  },
};
