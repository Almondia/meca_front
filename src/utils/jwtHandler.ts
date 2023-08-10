/* eslint-disable import/prefer-default-export */
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const getJWTPayload = (token: string, key: string) => {
  try {
    const payload = jwtDecode<JwtPayload & { [key: string]: string }>(token);
    return payload[key];
  } catch {
    return undefined;
  }
};
