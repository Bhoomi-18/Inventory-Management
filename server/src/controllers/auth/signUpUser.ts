import { Request, Response } from 'express';
import { getGlobalModels } from '../../models/globalModels';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUpUser = async (req: Request, res: Response) => {
  const name     = (req.body.name     || '').trim();
  // Always normalize email: trim + lowercase
  const email    = (req.body.email    || '').trim().toLowerCase();
  const password = (req.body.password || '').trim();

  if (!name || name.length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters.' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  if (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    return res.status(400).json({
      message: 'Password must include lowercase, uppercase, digit and symbol.',
    });
  }

  try {
    const { User } = await getGlobalModels();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET env var is not set!');
      return res.status(500).json({ message: 'Server configuration error. Please contact support.' });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
    res.status(201).json({ token });
  } catch (err: any) {
    console.error('Signup error:', err?.message || err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};