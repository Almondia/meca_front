export const getJWTPayload = async (token: string, key: string) => {
  try {
    const jwt = await import('jsonwebtoken');
    const decodedJwt = jwt.decode(token) as { [key: string]: string | undefined };
    return decodedJwt[key];
  } catch {
    return undefined;
  }
};

export const isValidJWT = async (token: string) => {
  const secret = process.env.NEXT_PUBLIC_SECRETS_KEY;
  if (!secret || !token) {
    return false;
  }
  try {
    const jwt = await import('jsonwebtoken');
    jwt.verify(token, secret, { algorithms: ['HS256'] });
    return true;
  } catch {
    return false;
  }
};

export const generateJWT = async (payload: object, expiresIn: string) => {
  const secret = process.env.NEXT_PUBLIC_SECRETS_KEY;
  if (!secret) {
    return null;
  }
  try {
    const jwt = await import('jsonwebtoken');
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  } catch {
    return null;
  }
};
