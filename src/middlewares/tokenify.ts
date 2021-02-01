import jwt from 'jsonwebtoken';

const key = process.env.SECRET_KEY || 'secret';
const Tokenify = (_id: string, email: string): string =>
  jwt.sign({ _id, email }, key);

export default Tokenify;
