/* eslint-disable import/prefer-default-export */

import jwt from 'jsonwebtoken';

export const getJWTPayload = (token: string, key: string) => {
  try {
    const decodedJwt = jwt.decode(token) as { [key: string]: string | undefined };
    return decodedJwt[key];
  } catch {
    return undefined;
  }
};

export const isValidJWT = (token: string) => {
  const secret = process.env.NEXT_PUBLIC_SECRETS_KEY;
  if (!secret || !token) {
    return false;
  }
  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_SECRETS_KEY ?? '', { algorithms: ['HS256'] });
    return true;
  } catch {
    return false;
  }
};

export const generateJWT = (payload: object, expiresIn: string) => {
  const secret = process.env.NEXT_PUBLIC_SECRETS_KEY;
  if (!secret) {
    return null;
  }
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
