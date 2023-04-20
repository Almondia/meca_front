/* eslint-disable import/prefer-default-export */
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const getJWTPayload = (token: string) => {
  try {
    const { id } = jwtDecode<JwtPayload & { id?: string }>(token);
    return { id };
  } catch {
    return { id: undefined };
  }
};
