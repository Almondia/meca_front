/* eslint-disable react/no-unstable-nested-components */
import dynamic from 'next/dynamic';

import { memo } from 'react';

const getYYMMDD = (date: string) => {
  const [year, month, day] = date.split('T')[0].split('-');
  return `${year.substring(2)}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
};

const RelativeDate = memo(({ date }: { date: string }) => {
  const RelativeDateComponent = dynamic(
    async () => {
      const { getRelativeTimeByDateTime } = await import('@/utils/common');
      return () => <>{getRelativeTimeByDateTime(date)}</>;
    },
    {
      loading: () => <>{getYYMMDD(date)}</>,
    },
  );
  return <RelativeDateComponent />;
});

export default RelativeDate;
