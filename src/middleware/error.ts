import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validForm = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("username")
    .isString()
    .notEmpty()
    .withMessage("Username is required"),

  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("confirmPassword")
    .isString()
    .notEmpty()
    .withMessage("Please confirm your password"),
];

function handleErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

export { validForm, handleErrors };

