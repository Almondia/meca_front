/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-no-useless-fragment */
import dynamic from 'next/dynamic';

const getYYMMDD = (date: string) => {
  const [year, month, day] = date.split('T')[0].split('-');
  return `${year}년 ${month.padStart(2, '0')}월 ${day.padStart(2, '0')}일`;
};

export const RelativeDateText = ({ date }: { date: string }) => {
  const RelativeDateTextComponent = dynamic(
    async () => {
      const { getRelativeTimeByDateTime } = await import('@/utils/common');
      return () => <>{getRelativeTimeByDateTime(date)}</>;
    },
    {
      loading: () => <>{getYYMMDD(date)}</>,
    },
  );
  return RelativeDateTextComponent;
};
