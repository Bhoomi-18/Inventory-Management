import { Request, Response } from "express";
import { getGlobalModels } from '../../models/globalModels';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
      const { User } = await getGlobalModels();
      const user = await User.findById(req.userId).select('name email');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      console.error('Get user error:', err);
      res.status(500).json({ message: 'Server error' });
    }
}
