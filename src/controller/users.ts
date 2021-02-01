import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models';
import Tokenify from '../middlewares/tokenify';

export async function signUpUser(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    const user = await newUser.save();

    res.status(201).send({
      status: 'success',
      message: `Welcome ${newUser.name}`,
      user,
      token: Tokenify(newUser._id, newUser.email),
    });
  } catch (error) {
    if (error.message.includes('duplicate key')) {
      return res.status(400).send({
        status: 'error',
        message: 'User with email already exists',
      });
    }
    return res.status(500).send({ status: 'error', message: error.message });
  }
}

export async function loginUser(
  req: Request,
  res: Response
): Promise<void | Response> {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        status: 'error',
        message: 'Invalid Credentials',
      });
    }
    const match = await bcrypt.compare(password, user?.password);
    if (match) {
      // const { adverts, name, _id, email, createdAt, updatedAt } = user;
      const token = Tokenify(user._id, user.email);
      return res.status(200).send({
        status: 'success',
        token,
        user,
      });
    }
    return res.status(401).send({
      status: 'error',
      message: 'Invalid Credentials',
    });
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Our server is in the locker room, please do try again.',
    });
  }
}
