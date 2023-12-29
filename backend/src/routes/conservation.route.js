import express from 'express';
import * as conversationController from '../controllers/conversation.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', userAuth, conversationController.createConversation);

router.get('/:user_id',userAuth , conversationController.findConversation);

export default router;
