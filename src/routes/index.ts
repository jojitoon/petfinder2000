import { Router, Request, Response, NextFunction } from 'express';
import { loginUser, signUpUser } from '../controller/users';
import isAuth from '../middlewares/isAuth';
import { ExtraRequest } from '../types';
import {
  signupValidator,
  loginValidator,
  advertsValidator,
} from '../middlewares/validations';
import resolveValidations from '../middlewares/resolveValidations';
import {
  allAdvertisement,
  createAdvertisement,
  oneAdvertisement,
} from '../controller/adverts';
import injectReq from '../helpers/injectReq';

const router = Router();

// User Auth
router.post('/login', loginValidator, resolveValidations, loginUser);

router.post('/signup', signupValidator, resolveValidations, signUpUser);

// advertisement

router.get('/advertisement', injectReq(allAdvertisement));
router.get('/advertisement/:id', injectReq(oneAdvertisement));
router.post(
  '/advertisement',
  injectReq(isAuth),
  advertsValidator,
  resolveValidations,
  injectReq(createAdvertisement)
);

export default router;
