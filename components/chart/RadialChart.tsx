import Chart from 'react-apexcharts';
import styled from 'styled-components';

import { COLOR } from '@/styles/constants';

const RadialChartWrapper = styled.div`
  position: relative;
  min-height: 190px;
  & > div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
`;

export interface RadialChartProps {
  value: number;
  label?: {
    pre: string;
    post: string;
  };
}

const RadialChart = ({ value, label }: RadialChartProps) => {
  const series = [Number(value.toFixed(2))];
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
    <RadialChartWrapper>
      <Chart options={options} series={series} type="radialBar" width="100%" height="115%" />
    </RadialChartWrapper>
  );
};

export default RadialChart;
