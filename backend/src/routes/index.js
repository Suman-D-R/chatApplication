import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import conversationRoute from './conservation.route';
import messageRoute from './message.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/conversation', conversationRoute);
  router.use('/message',messageRoute);


  return router;
};

export default routes;
