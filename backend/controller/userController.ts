import chalk from 'chalk';
import { Request, Response } from 'express';
import { getUserService } from '../services/userService';

const getUser = async (req: Request, res: Response) => {
  try {
    const response = await getUserService();

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed('getUser controller error:', error));
    return res.json({
      message: 'Fetch users failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

module.exports = {
  getUser,
};
