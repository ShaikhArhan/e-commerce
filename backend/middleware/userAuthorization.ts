import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../services/tokenService';
import { userAuthorizationMiddlewareDto } from '../dtos/tokenDto';

const userVerify =
  (requiredRole: string | Array<string>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = `${req.headers['authorization']}`.split(' ')[1] as string;

      if (!token) {
        throw new Error('login required');
      }

      const response = await verifyToken<userAuthorizationMiddlewareDto>(token);

      if (!response.data || !response.status || response.error) {
        return res.json(response);
      }
      const userRole: string = response.data.role;

      if (typeof requiredRole === 'string' && requiredRole === userRole) {
        return next();
      }
      if (Array.isArray(requiredRole) && requiredRole.includes(userRole)) {
        return next();
      }

      throw new Error('you are not authorized');
    } catch (error) {
      console.error(
        chalk.bgRed('middleware authorization userVerify error:', error)
      );
      return res.json({
        message: 'Not authorization to this',
        status: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

module.exports = {
  userVerify,
};
