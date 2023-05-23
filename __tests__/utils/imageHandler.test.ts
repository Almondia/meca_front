import { extractAllImageSrc, extractFirstImageSrc, getImageInfo, validImageFile } from '@/utils/imageHandler';

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

  describe('validImageFile', () => {
    it.each([['jpg'], ['jpeg'], ['png'], ['gif']])(
      '지정된 (%s) 이미지 파일에 대해 validation이 통과한다.',
      (arg0: string) => {
        const file = new File(['abc'], `file.${arg0}`, { type: `image/${arg0}` });
        const { valid } = validImageFile(file);
        expect(valid).toBeTruthy();
      },
    );

    it('지정되지 않은 이미지 파일에 대해 validation이 실패한다.', () => {
      const file = new File(['abc'], 'file.bmp', { type: 'image/bmp' });
      const { valid } = validImageFile(file);
      expect(valid).toBeFalsy();
    });

    it('지정되지 않은 파일에 대해 validation이 실패한다.', () => {
      const file = new File(['abc'], 'file.txt', { type: 'text/plain' });
      const { valid } = validImageFile(file);
      expect(valid).toBeFalsy();
    });

    it('이미지 이름에 "."이 포함되어있다면 validation이 실패한다.', () => {
      const file = new File(['abc'], 'img.img.jpeg', { type: 'image/jpeg' });
      const { valid } = validImageFile(file);
      expect(valid).toBeFalsy();
    });
  });

  describe('getImageInfo', () => {
    it('이미지 파일의 info를 얻을 수 있다.', () => {
      const file = new File(['abc'], 'name.jpeg', { type: 'image/jpeg' });
      const { fileName, extension } = getImageInfo(file);
      expect(fileName).toEqual('name');
      expect(extension).toEqual('jpeg');
    });
  });
});
