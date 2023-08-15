// eslint-disable-next-line import/prefer-default-export
export const hasBrowser = () => typeof window !== 'undefined';

export const getYYMMDDFromDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year.toString().substring(2)}.${month}.${day}`;
};

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
  return getYYMMDDFromDate(timeValue);
};

export const debouncedFunc = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
