import { getRelativeTimeByDateTime } from '@/utils/common';

describe('getRelativeTimeByDateTime', () => {
  it('1분 전 날짜라면 "방금전"을 리턴한다.', () => {
    const time = new Date(Date.now() - 30 * 1000).toISOString();
    expect(getRelativeTimeByDateTime(time)).toBe('방금전');
  });

  it('1시간 전이라면 "{n}분전"을 리턴한다. ', () => {
    const time = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    expect(getRelativeTimeByDateTime(time)).toBe('30분전');
  });

  it('24시간 전이라면 "{n}시간전"을 리턴한다.', () => {
    const time = new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString();
    expect(getRelativeTimeByDateTime(time)).toBe('10시간전');
  });

  it('3일 전이라면 "{n}일전"을 리턴한다.', () => {
    const time = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(getRelativeTimeByDateTime(time)).toBe('2일전');
  });

  it('3일보다 오래되었다면 "{year}년 {month}월 {date}일"을 리턴한다.', () => {
    const time = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString();
    const year = time.substring(0, 4);
    const month = time.substring(5, 7);
    const date = time.substring(8, 10);
    expect(getRelativeTimeByDateTime(time)).toBe(`${year}년 ${month}월 ${date}일`);
  });
});
