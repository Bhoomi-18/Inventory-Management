import { Request, Response } from 'express';
import { getGlobalModels } from '../../models/globalModels';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {
  // Always normalize: trim whitespace and lowercase so "Bhoomi@test.com" == "bhoomi@test.com"
  const email    = (req.body.email    || '').trim().toLowerCase();
  const password = (req.body.password || '').trim();

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const { User } = await getGlobalModels();
    const user = await User.findOne({ email });

    // Use same message for "not found" and "wrong password" — avoids user enumeration
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET env var is not set!');
      return res.status(500).json({ message: 'Server configuration error. Please contact support.' });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
    res.status(200).json({ token });
  } catch (err: any) {
    console.error('Login error:', err?.message || err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};