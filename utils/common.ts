// eslint-disable-next-line import/prefer-default-export
export const hasBrowser = () => typeof window !== 'undefined';

export const getRelativeTimeByDateTime = (time: string) => {
  const today = new Date();
  const timeValue = new Date(time);
  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 3) {
    return `${betweenTimeDay}일전`;
  }

  const year = timeValue.getFullYear();
  const month = (timeValue.getMonth() + 1).toString().padStart(2, '0');
  const date = timeValue.getDate().toString().padStart(2, '0');
  return `${year}년 ${month}월 ${date}일`;
};
