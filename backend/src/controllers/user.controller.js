import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';



export const userRegistration = async (req, res) => {
  try {
    const data = await UserService.userRegistration(req.body);
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

export const loginUser = async (req, res) => {
  try {
    const data = await UserService.loginUser(req.body);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.Ok,
        data: data,
        message: 'User created successfully'
      });
    }
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: error.message
    });
  }
};


