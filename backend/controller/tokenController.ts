import chalk from 'chalk';
import { Request, Response } from 'express';
import { verifyToken } from '../services/tokenService';
import { UserDecodeTokenDto } from '../dtos/tokenDto';

const getDecodeToken = async (req: Request, res: Response) => {
  try {
    const token = req.body.token as string;

    const response = await verifyToken<UserDecodeTokenDto>(token);
    const { id, fullname, email, password, country, phoneNumber, address } =
      response.data as UserDecodeTokenDto;

    if (response?.status) {
      return res.json({
        data: {
          id,
          fullname,
          email,
          country,
          phoneNumber,
          address,
        },
        message: response.message,
        status: response.status,
      });
    } else if (!response?.status) {
      return res.json(response);
    }

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('getDecodeToken controller error:', error));
    return res.json({
      message: 'Fetch decode token failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

module.exports = {
  getDecodeToken,
};
