import { Request, Response } from 'express';
import { ICreateUserRequest } from '../schemas/user.schema';
import { createUser } from '../service/user.service';

export async function createUserHandler(
  req: ICreateUserRequest,
  res: Response
): Promise<void> {
  const { body } = req;

  try {
    const user = await createUser(body);

    res.status(201).json({
      message: 'User created successfully',
      user,
    });
    return;
  } catch (error: any) {
    // MongoDB duplicate key error
    if (error.code === 11000) {
      // Conflict status code
      res.status(409).json({
        message: 'Email already exists',
        error: 'Duplicate key error',
      });
      return;
    }

    res.status(500).json({
      message: 'Internal server error',
      error,
    });
    return;
  }
}
