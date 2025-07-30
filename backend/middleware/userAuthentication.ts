import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../services/tokenService';
import { loginService } from '../services/authService';
import { LoginDto } from '../dtos/authDto';
import { userAuthenticationMiddlewareDto } from '../dtos/tokenDto';

const userVerify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = `${req.headers['authorization']}`.split(' ')[1] as string;

    if (!token) {
      throw new Error('login required');
    }

    const response = await verifyToken<userAuthenticationMiddlewareDto>(token);

    if (!response.data || !response.status || response.error) {
      return res.json(response);
    }

    const userExist = await loginService(<LoginDto>response.data);

    if (!userExist.data || !userExist.status || userExist.error) {
      return res.json(response);
    }

    next();
  } catch (error) {
    console.error(
      chalk.bgRed('middleware Authentication userVerify error:', error)
    );
    return res.json({
      message: 'Not authenticated to this',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

module.exports = {
  userVerify,
};
