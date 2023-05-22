import { createQueryString, parseQueryString } from '@/utils/queryStringHandler';

describe('queryStringHandler', () => {
  describe('parseQueryString', () => {
    it('querystring이 존재하는 url에서 querystring object를 리턴한다.', () => {
      const url = 'http://localhost?abc=123&sort=false';
      const result = parseQueryString(url);
      expect(result).toHaveProperty('abc', '123');
      expect(result).toHaveProperty('sort', 'false');
    });

    it('querystring이 존재하지 않는 url일 경우 빈 object를 리턴한다.', () => {
      const url = 'http://localhost/a/123';
      const result = parseQueryString(url);
      expect(result).toMatchObject({});
    });
  });

  describe('createQueryString', () => {
    it('key-value params에 대해 queryString 문자열을 리턴한다.', () => {
      const result = createQueryString({ sort: 'false' });
      expect(result).toEqual('?sort=false');
    });

    it('여러 key-value params에 대해 queryString을 조합한 문자열을 리턴한다.', () => {
      const result = createQueryString({ sort: 'false', abc: '123', kkk: '김갑환' });
      expect(result).toEqual(`?sort=false&abc=123&kkk=${encodeURI('김갑환')}`);
    });
  });
});
