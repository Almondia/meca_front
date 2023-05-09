import { generateJWT, getJWTPayload, isValidJWT } from '@/utils/jwtHandler';
import { waitFor } from '@testing-library/react';

describe('jwtHandler', () => {
  describe('getJWTPayload', () => {
    it('정상적인 jwt에서 id를 리턴할 수 있다.', async () => {
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.EHjQ2MYhkkBlXetB5p5_Q5UN5tbYJUB0ObFKxKjZ6Jc';
      const payload = await getJWTPayload(jwt, 'id');
      expect(payload).toEqual('1234567890');
    });

    it('잘못된 jwt 요청은 undefined 반환한다.', async () => {
      const jwt =
        'eyJpbGciOi1IUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE14444yMzkwMjJ9.EHjQ2MYhkkBlXetB5p5_Q5UN5tbYJUB0ObFKxKjZ6Jc';
      const payload = await getJWTPayload(jwt, 'id');
      expect(payload).toBeUndefined();
    });

    it('id payload가 없는 jwt 요청은 undefined를 반환한다.', async () => {
      // name: My First String
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik15IEZpcnN0IFN0cmluZyJ9.JgmkDlifYGeAc4ISX4LH4jJaR4g-U2brZfEM-PbhS8M';
      const payload = await getJWTPayload(jwt, 'id');
      expect(payload).toBeUndefined();
    });
  });

  describe('generateJWT', () => {
    it('token을 생성할 수 있다.', async () => {
      const jwt = await generateJWT({ id: '123' }, '1s');
      expect(jwt).not.toBeNull();
      const result = await getJWTPayload(jwt as string, 'id');
      expect(result).toEqual('123');
    });
  });

  describe('isValidJWT', () => {
    it('유효한 token이면 true가 리턴된다.', async () => {
      const jwt = await generateJWT({ id: '123' }, '3s');
      const result = await isValidJWT(jwt as string);
      expect(result).toBeTruthy();
    });

    it('유효하지 않은 token이면 false가 리턴된다.', async () => {
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik15IEZpcnN0IFN0cmluZyJ9.JgmkDlifYGeAc4ISX4LH4jJaR4g-U2brZfEM-PbhS8M';
      const result = await isValidJWT(jwt);
      expect(result).toBeFalsy();
    });
    it('만료된 token이면 false가 리턴된다.', async () => {
      const jwt = await generateJWT({ id: '123' }, '0.1s');
      const result = await isValidJWT(jwt as string);
      await waitFor(() => expect(result).toBeFalsy());
    });
  });
});
