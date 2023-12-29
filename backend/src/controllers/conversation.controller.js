import HttpStatus from 'http-status-codes';
import * as conversationService from '../services/conversation.service';

export const createConversation = async (req, res) => {
  try {
    const data = await conversationService.createConversation(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const findConversation = async (req, res) => {
  try {
    const data = await conversationService.findConversation(req.params.user_id);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};
