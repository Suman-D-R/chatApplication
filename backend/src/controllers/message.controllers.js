import HttpStatus from 'http-status-codes';
import * as messageService from '../services/message.service';

export const sendMessage = async (req, res) => {
  try {
    const data = await messageService.sendMessage(req.body.data);
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

export const getMessage = async (req, res) => {
  try {
    const data = await messageService.getMessage(req.params.conversationId);
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
