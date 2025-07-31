import {Request, Response } from "express";
import User from '../../models/userModel';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
      const user = await User.findById(req.userId).select('name email');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
}
