import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'default-jwt-secret-key-12345';

export interface AdminSession {
  username: string;
  role: string;
}

export function signToken(payload: AdminSession): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSession;
  } catch (error) {
    return null;
  }
}

export function getSession(req: NextRequest): AdminSession | null {
  const tokenCookie = req.cookies.get('admin_session');
  if (!tokenCookie) return null;
  return verifyToken(tokenCookie.value);
}
