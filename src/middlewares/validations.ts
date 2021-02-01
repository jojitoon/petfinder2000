import { body } from 'express-validator';

const isRequiredMessage = (field: string) => `${field} is required.`;
const isOfTypeMessage = (field: string, type: string, adj = 'an') =>
  `${field} should be ${adj} ${type}.`;

export const loginValidator = [
  body('email')
    .exists()
    .withMessage(isRequiredMessage('email'))
    .isString()
    .withMessage(isOfTypeMessage('email', 'string', 'a'))
    .isEmail()
    .withMessage('must be a valid email'),
  body('password')
    .exists()
    .withMessage(isRequiredMessage('password'))
    .isString()
    .withMessage(isOfTypeMessage('password', 'string', 'a'))
    .isLength({ min: 6 })
    .withMessage('password must be at 6 letters long'),
];

export const signupValidator = [
  body('name')
    .exists()
    .withMessage(isRequiredMessage('name'))
    .isString()
    .withMessage(isOfTypeMessage('name', 'string', 'a')),
  ...loginValidator,
];

export const advertsValidator = [
  'title',
  'imageUrl',
  'type',
  'description',
].map((key) =>
  body(key)
    .exists()
    .withMessage(isRequiredMessage(key))
    .isString()
    .withMessage(isOfTypeMessage(key, 'string', 'a'))
);
