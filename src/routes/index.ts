import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  const { name } = req.body;

  return res.json({ message: 'ok' });
});

export default routes;
