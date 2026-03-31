import { Request, Response } from "express";
import { getGlobalModels } from '../../models/globalModels';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUpUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters and include lowercase, uppercase, digit and symbol.' });
  }

  if (!/[a-z]/.test(password)
      || !/[A-Z]/.test(password)
      || !/[0-9]/.test(password)
      || !/[^A-Za-z0-9]/.test(password)
  ) {
    return res.status(400).json({ message: 'Password must include lowercase, uppercase, digit and symbol.' });
  }

  try {
      const { User } = await getGlobalModels();
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(409).json({ message: 'Email already in use' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });

      res.status(201).json({ token });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
}