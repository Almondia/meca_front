/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-useless-fragment */
import dynamic from 'next/dynamic';

import React from 'react';

const getYYMMDD = (date: string) => {
  const [year, month, day] = date.split('T')[0].split('-');
  return `${year.substring(2)}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
};

const RelativeDateText = ({ date }: { date: string }) => {
  const RelativeDateTextComponent = dynamic(
    async () => {
      const { getRelativeTimeByDateTime } = await import('@/utils/common');
      return () => <>{getRelativeTimeByDateTime(date)}</>;
    },
    {
      loading: () => <>{getYYMMDD(date)}</>,
    },
  );
  return <RelativeDateTextComponent />;
};

export default React.memo(RelativeDateText);
