import { NextFunction, Response, Request } from 'express';
import { ExtraRequest } from '../types';

type CallBack = (
  req: ExtraRequest,
  res: Response,
  next: NextFunction
) => Promise<void | Response> | void | Response;
const injectReq = (cb: CallBack) => (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> | void | Response =>
  cb(req as ExtraRequest, res, next);

export default injectReq;
