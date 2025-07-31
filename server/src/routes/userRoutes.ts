import express from 'express';
import jwt from 'jsonwebtoken';
import { loginUser } from '../controllers/auth/loginUser';
import { signUpUser } from '../controllers/auth/signUpUser';
import { getUser } from '../controllers/auth/getUser';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;    
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/me', authenticate, getUser);


export default router;