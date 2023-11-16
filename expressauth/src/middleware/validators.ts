import { body, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const loginValidator = [
  body('username', 'Username cannot be empty').not().isEmpty(),
  body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
];

export const registerValidator = [
  body('username', 'Username cannot be empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password cannot be empty').not().isEmpty(),
  body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
  body('passwordRepeat', 'Password cannot be empty').not().isEmpty(),
  body('passwordRepeat', 'The minimum password length is 6 characters').isLength({ min: 6 }),
];

export const newPasswordValidator = [
  param('resetToken', 'Reset token cannot be empty').notEmpty(),
  body('password', 'Password cannot be empty').not().isEmpty(),
  body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
  body('password').custom((value: string, { req }) => {
    const duplicatePassword: string = req.body.passwordDuplicate
    if (value !== duplicatePassword) {
      throw new Error('Passwords do not match');
    } else {
      return true
    }
  })
];

export const changepasswordPage = [
  param('resetToken', 'Reset token cannot be empty').notEmpty(),
];

export const emailValidator = [
  body('email', 'Invalid email').isEmail(),
];
