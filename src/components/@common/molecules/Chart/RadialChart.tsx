import Chart from 'react-apexcharts';

import { ElementSizeType } from '@/types/common';

import { COLOR } from '@/styles/constants';

import { ChartWrapper } from './styled';

interface RadialChartProps {
  value: number;
  label?: {
    pre: string;
    post: string;
  };
  maxValue: number;
  minHeights: ElementSizeType[];
}

const RadialChart = ({ value, maxValue, label, minHeights }: RadialChartProps) => {
  const series = [(Number(value.toFixed(2)) / maxValue) * 100];
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        },
        dataLabels: {
          value: {
            show: false,
          },
          total: {
            show: false,
          },
          name: {
            show: true,
            offsetY: 8,
          },
        },
      },
    },
    colors: [value > 50 ? COLOR.warning : COLOR.success],
    labels: label ? [`${label.pre} ${value.toFixed(2)}${label.post}`] : [`${value.toFixed(2)}%`],
  };
  return (
    <ChartWrapper minHeights={minHeights}>
      <Chart options={options} series={series} type="radialBar" width="100%" height="120%" />
    </ChartWrapper>
  );
};

export default RadialChart;
