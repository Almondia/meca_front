import Chart from 'react-apexcharts';

import { COLOR } from '@/styles/constants';
import { ElementSizeType } from '@/types/common';

import { ChartWrapper } from './styled';

interface GroupBarChartProps {
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
      data: firstValues.map((val) => (val === 0 ? 0.025 : val)),
    },
    {
      data: secondValues.map((val) => (val === 0 ? 0.025 : val)),
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
        borderRadius: 2,
      },
    },
    colors: [COLOR.brand3, 'var(--color-brand)'],
    dataLabels: {
      enabled: true,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '12px',
        colors: ['#000', '#FFF'],
      },
      formatter(value: number, opts: any) {
        // TODO: 특정 데이터에 종속되어있는 처리임, 다른 곳에서 사용될 때 향후 개선 필요
        if (opts.seriesIndex === 0 && value >= 0.1) {
          return `${((value / secondValues[opts.dataPointIndex]) * 100).toFixed(1)}점`;
        }
        if (opts.seriesIndex === 1 && value >= 0.1) {
          return `${value}문제`;
        }
        return ' ';
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
              columnWidth: '70px',
            },
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
