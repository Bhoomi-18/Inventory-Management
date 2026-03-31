import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
    tenantId?: string;
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: 'JWT_SECRET is missing' });

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    req.userId = String(decoded?.id);

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireTenant = (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.headers['x-tenant-id'] as string | undefined || req.userId;
  if (!tenantId) return res.status(401).json({ message: 'Tenant context is required' });

  req.tenantId = tenantId;
  next();
};