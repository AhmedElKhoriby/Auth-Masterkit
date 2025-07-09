import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

// Middleware to validate request data using Zod schemas
// This middleware will parse the request body, query, and params using the provided Zod schema
const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = parsedData.body;
      req.query = parsedData.query;
      req.params = parsedData.params;

      next();
    } catch (error: any) {
      // error to handle
      res.status(400).send(error.errors || { message: 'Invalid request data' });
      return;
    }
  };

export default validate;
