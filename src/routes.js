import { Router } from 'express';

import User from './app/models/User'

const routes = Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Felipe Santos',
    email: 'felipe@gmail.com',
    password_hash: '1234'

  })
  res.json(user);
});

export default routes;
