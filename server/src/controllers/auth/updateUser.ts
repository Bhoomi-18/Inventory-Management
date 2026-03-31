import { Request, Response } from 'express';
import { getGlobalModels } from '../../models/globalModels';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, email } = req.body;
    const { User } = await getGlobalModels();
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (email) {
      const existing = await User.findOne({ email, _id: { $ne: user._id } });
      if (existing) return res.status(409).json({ message: 'Email already in use' });
      user.email = email;
    }

    await user.save();
    res.json({ message: 'Profile updated successfully', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};