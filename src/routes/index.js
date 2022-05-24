import express from 'express';

import { ImageRoute } from './image.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/image',
    route: ImageRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
