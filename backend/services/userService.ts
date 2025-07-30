import chalk from 'chalk';
import { db } from '../config/db';
import { users } from '../drizzle/schema/users';

export const getUserService = async () => {
  try {
    const response = await db.select().from(users);

    if (!response) {
      throw new Error('Fetch user failed');
    }
    if (response.length === 0) {
      throw new Error('No user found');
    }

    return {
      data: response,
      message: 'Fetch user successful',
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed('getUser service error:', error));
    return {
      message: 'Fetch user failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
