import Chart from 'react-apexcharts';

import { COLOR } from '@/styles/constants';
import { ElementSizeType } from '@/types/common';

import { ChartWrapper } from './styled';

export interface GroupBarChartProps {
  legends: string[];
  axisNames: string[];
  firstValues: number[];
  secondValues: number[];
  /** [0: default, 1: tablet, 2: mobile] */
  minHeights: ElementSizeType[];
}

const GroupBarChart = ({ legends, axisNames, firstValues, secondValues, minHeights }: GroupBarChartProps) => {
  const series = [
    {
      data: firstValues.map((val) => (val === 0 ? 0.2 : val)),
    },
    {
      data: secondValues.map((val) => (val === 0 ? 0.2 : val)),
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
      formatter(value: number) {
        return value === 0.2 ? 0 : value;
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
        radius: 2,
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
    <ChartWrapper minHeights={minHeights}>
      <Chart series={series} options={options} type="bar" width="100%" height="100%" />
    </ChartWrapper>
  );
};

export default GroupBarChart;
