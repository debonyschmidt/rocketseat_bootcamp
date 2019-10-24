import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Debony Schmidt',
    email: 'debony_13_@hotmail.com',
    password_hash: '1234556',
  });
  return res.json(user);
});

export default routes;
