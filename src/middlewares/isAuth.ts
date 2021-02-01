import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ExtraRequest, IUserObject } from '../types';

export default (
  req: ExtraRequest,
  res: Response,
  next: NextFunction
): void | Response => {
  const token = req.headers['authorization'];
  const key = process.env.SECRET_KEY || 'secret';
  if (token) {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'error',
          error: err.name,
          message: 'Authorization failed',
        });
      } else {
        const user = decoded as IUserObject;
        req.currentUser = user;
        next();
      }
    });
  } else {
    return res.status(401).json({
      status: 'error',
      message: 'Authorization failed. Login first',
    });
  }
};
