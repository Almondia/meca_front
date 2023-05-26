import { getJWTPayload } from '@/utils/jwtHandler';

describe('jwtHandler', () => {
  describe('getJWTPayload', () => {
    it('정상적인 jwt에서 id를 리턴할 수 있다.', () => {
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.EHjQ2MYhkkBlXetB5p5_Q5UN5tbYJUB0ObFKxKjZ6Jc';
      const payload = getJWTPayload(jwt, 'id');
      expect(payload).toEqual('1234567890');
    });

    it('잘못된 jwt 요청은 undefined 반환한다.', () => {
      const jwt =
        'eyJpbGciOi1IUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE14444yMzkwMjJ9.EHjQ2MYhkkBlXetB5p5_Q5UN5tbYJUB0ObFKxKjZ6Jc';
      const payload = getJWTPayload(jwt, 'id');
      expect(payload).toBeUndefined();
    });

    it('id payload가 없는 jwt 요청은 undefined를 반환한다.', () => {
      // name: My First String
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik15IEZpcnN0IFN0cmluZyJ9.JgmkDlifYGeAc4ISX4LH4jJaR4g-U2brZfEM-PbhS8M';
      const payload = getJWTPayload(jwt, 'id');
      expect(payload).toBeUndefined();
    });
  });
});
