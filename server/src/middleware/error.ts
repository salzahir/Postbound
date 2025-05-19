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


const validPost = [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("content")
    .isString()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),

  body("isPublic")
    .isBoolean()
    .withMessage("isPublic must be a boolean"),
];

const validComment = [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 50 characters"),

  body("content")
    .isString()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 5 })
    .withMessage("Content must be at least 5 characters long"),
];

function handleErrors(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
}

export { validForm, validPost, validComment, handleErrors };

