import { extractAllImageSrc, extractFirstImageSrc } from '@/utils/imageHandler';

describe('imageHandler', () => {
  describe('extractAllImageSrc', () => {
    it('문자열의 모든 지정된 img 태그 src 목록이 리턴된다.', () => {
      const tags =
        "<p>161616<img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300565757.png'></p><p><br></p><p>&lt;img src=\"hello\"/&gt;</p><p><br></p><p><img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300937980.png'></p>";
      const result = extractAllImageSrc(tags, 'https');
      expect(result).toHaveLength(2);
      expect(result?.[1]).toEqual(
        'https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300937980.png',
      );
    });

    it('img 태그가 없다면 undefined를 리턴한다.', () => {
      const tags = '<p>hello</p>&lt;img src="hello"/&gt;';
      const result = extractAllImageSrc(tags, '');
      expect(result).toBeUndefined();
    });

    it('문자열의 지정된 img 태그가 없다면 undefined를 리턴한다.', () => {
      const tags =
        "<p>161616<img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300565757.png'></p><p><br></p><p>&lt;img src=\"hello\"/&gt;</p><p><br></p><p><img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300937980.png'></p>";
      const result = extractAllImageSrc(tags, 'https://www.abc.com');
      expect(result).toBeUndefined();
    });
  });

  describe('extractFirstImageSrc', () => {
    it('문자열의 지정된 가장 처음 img 태그 src가 리턴된다.', () => {
      const tags =
        "<p>161616<img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300565757.png'></p><p><br></p><p>&lt;img src=\"hello\"/&gt;</p><p><br></p><p><img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300937980.png'></p>";
      const result = extractFirstImageSrc(tags, 'https://my-meca.s3.ap');
      expect(result).toEqual(
        'https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300565757.png',
      );
    });

    it('문자열의 지정된 가장 처음 img 태그가 없다면 undefined가 리턴된다..', () => {
      const tags =
        "<p>161616<img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300565757.png'></p><p><br></p><p>&lt;img src=\"hello\"/&gt;</p><p><br></p><p><img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300937980.png'></p>";
      const result = extractFirstImageSrc(tags, 'https://my-meca.s3.ap1111111');
      expect(result).toBeUndefined();
    });
  });
});
