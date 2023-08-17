import Chart from 'react-apexcharts';

import { ElementSizeType } from '@/types/common';

import { ChartWrapper } from './styled';

interface DonutChartProps {
  fillColors: string[];
  labels: string[];
  values: ApexNonAxisChartSeries;
  minHeights: ElementSizeType[];
}

const DonutChart = ({ fillColors, values, labels, minHeights }: DonutChartProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels,
    plotOptions: {
      pie: {
        donut: {
          size: '40%',
        },
      },
    },
    dataLabels: {
      style: {
        fontSize: '0.9rem',
      },
      dropShadow: {
        enabled: true,
      },
    },
    fill: {
      colors: fillColors,
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      show: true,
      floating: false,
      position: 'bottom',
      labels: {
        colors: ['var(--color-text)'],
      },
      markers: {
        fillColors: [...fillColors].reverse(),
        radius: 6,
      },
    },
    responsive: [
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
      <Chart options={options} series={values} type="donut" width="100%" height="120%" />
    </ChartWrapper>
  );
};

export default DonutChart;
