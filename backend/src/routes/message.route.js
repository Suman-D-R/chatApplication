import express from 'express';
import * as messageController from '../controllers/message.controllers';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/',userAuth, messageController.sendMessage);

router.get('/:conversationId',userAuth,messageController.getMessage);

export default router;
