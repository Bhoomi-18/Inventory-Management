import { Request, Response } from 'express';
import { getGlobalModels } from '../../models/globalModels';
import bcrypt from 'bcrypt';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const updatePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 8
      || !/[a-z]/.test(newPassword)
      || !/[A-Z]/.test(newPassword)
      || !/[0-9]/.test(newPassword)
      || !/[^A-Za-z0-9]/.test(newPassword)
    ) {
      return res.status(400).json({ message: 'New password must be 8+ characters and include lowercase, uppercase, digit and symbol' });
    }

    const { User } = await getGlobalModels();
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Update password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};