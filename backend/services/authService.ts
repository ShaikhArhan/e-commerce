import { and, eq, InferModel } from 'drizzle-orm';
import { db } from '../config/db';
import { users } from '../drizzle/schema/users';
import { LoginDto, RegisterDto } from '../dtos/authDto';
import { generateToken } from './tokenService';
import chalk from 'chalk';

export const loginService = async (data: object) => {
  try {
    const { email, password } = data as LoginDto;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    //check data in database
    const [response] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.password, password)))
      .limit(1);

    if (!response) {
      throw new Error('Invalid email or password');
    }

    // success response and generate token
    const { token, message, status } = await generateToken<object>(response);

    if (!token || !status) {
      throw new Error('Token generation failed');
    }
    // Return the token and a success message
    return {
      data: token,
      message: 'Login successful',
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed('Login service error:', error));
    return {
      message: 'Login failed',
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const registerService = async (data: object) => {
  try {
    const { fullname, email, password, country, phoneNumber, address, role } =
      data as RegisterDto;

    if (
      fullname === undefined ||
      fullname === null ||
      fullname === '' ||
      email === undefined ||
      email === null ||
      email === '' ||
      password === undefined ||
      password === null ||
      password === '' ||
      country === undefined ||
      country === null ||
      country === '' ||
      role === undefined ||
      role === null
    ) {
      throw new Error('All fields are required');
    }

    const response = await db.insert(users).values({
      fullname,
      email,
      password,
      country,
      phoneNumber,
      address,
      role,
    });

    if (!response) {
      throw new Error('Registration failed');
    }

    return {
      data: response,
      message: 'Registration successful',
      status: true,
    };
  } catch (error: any) {
    console.error(chalk.bgRed('Register service error:', error));

    let errorMessage = 'Unknown error';

    if (
      error?.cause?.code === '23505' ||
      error?.cause?.constraint === 'users_email_unique'
    ) {
      errorMessage = 'Email already exists';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      message: 'Registration failed',
      status: false,
      error: errorMessage,
    };
  }
};
