import Chart from 'react-apexcharts';
import styled from 'styled-components';

import { COLOR } from '@/styles/constants';

const GroupBarChartWrapper = styled.div`
  position: relative;
  min-height: 280px;
  & > div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  @media ${({ theme }) => theme.media.tablet} {
    min-height: 190px;
  }
`;

export interface GroupBarChartProps {
  legends: string[];
  axisNames: string[];
  firstValues: number[];
  secondValues: number[];
}

const GroupBarChart = ({ legends, axisNames, firstValues, secondValues }: GroupBarChartProps) => {
  const series = [
    {
      data: firstValues,
    },
    {
      data: secondValues.map((val) => val),
    },
  ];
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      offsetY: -10,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        hideZeroBarsWhenGrouped: true,
        dataLabels: {
          position: 'top',
        },
        columnWidth: '80px',
        borderRadius: 6,
      },
    },
    colors: [COLOR.brand3, 'var(--color-brand)'],
    dataLabels: {
      enabled: true,
      offsetX: 0,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
    },
    stroke: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: axisNames,
      labels: {
        show: true,
        style: {
          colors: 'var(--color-text)',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: true,
    },
    legend: {
      labels: {
        colors: 'var(--color-text)',
      },
      customLegendItems: legends,
      position: 'bottom',
      markers: {
        radius: 6,
      },
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50px',
            },
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          legend: {
            position: 'right',
            offsetY: 20,
          },
        },
      },
    ],
  };
  return (
    <GroupBarChartWrapper>
      <Chart series={series} options={options} type="bar" width="100%" height="100%" />
    </GroupBarChartWrapper>
  );
};

export default GroupBarChart;
