import { JsonWebTokenError, sign, verify } from 'jsonwebtoken';
import chalk from 'chalk';

const jwtKey: string = process.env.JWT_KEY!;
if (!jwtKey) {
  throw new Error('JWT_KEY is not defined in environment variables');
}

export const generateToken = async <T>(data: T) => {
  try {
    if (!data || data === undefined || data === null || data === '') {
      throw new Error('Data required for token generation');
    }

    const token = (await sign(data, jwtKey, { expiresIn: '1d' })) as string;

    if (!token) {
      throw new Error('Token generation failed');
    }

    return {
      token: token,
      message: 'Token generate successful',
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed('Error generating token: ', error));
    return {
      message: 'Token generate failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const verifyToken = async <T>(token: string) => {
  try {
    if (!token) {
      throw new Error('token required for token verifycation');
    }

    const decodedToken = verify(token, jwtKey) as T;

    if (!decodedToken) {
      throw new Error('Token verification failed');
    }

    return {
      data: <T>decodedToken,
      message: 'Token verify successful',
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed('Error verifying token: ', error));

    if (error instanceof JsonWebTokenError) {
      throw new Error('Authentication expired, login again!');
    }

    return {
      message: 'Token verify failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
