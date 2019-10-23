import { Router } from 'express';
import user from './app/models/user';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Debony Schmidt',
    email: 'debonyschmidt@gmail.com',
    password_hash: '123456'
  });

  return res.json(user);
});

export default routes;
