import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/api/users/signin', 
  //validation using express-validator
  [
    //emailvalidation
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    //password validation
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ], 
  //in case of validation error, throwing custom error
  validateRequest, 

//route Handler 
async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({email});

  //Check credentials
  if(!existingUser){
    throw new BadRequestError("Invalid credentials")
  }
  const passwordMatch = await Password.compare(existingUser.password, password)

  if(!passwordMatch){
    throw new BadRequestError("invalid Credentials")
  }

  //regenerate JWT
  const userJwt = jwt.sign({  
    id: existingUser.id,
    email: existingUser.email
    }, process.env.JWT_KEY! 
  ) 

  //Store it on session cookie object
    req.session = {
      jwt: userJwt
    }

  res.status(200).send(existingUser);
});

export { router as signinRouter };
