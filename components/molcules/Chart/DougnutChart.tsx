import Chart from 'react-apexcharts';
import styled from 'styled-components';

const DoughnutChartWrapper = styled.div`
  position: relative;
  min-height: 240px;
  & > div {
    width: 100%;
    position: absolute;
    left: 0;
    top: 10px;
  }
  @media ${({ theme }) => theme.media.tablet} {
    min-height: 190px;
  }
`;

export interface DoughnutChartProps {
  fillColors: string[];
  labels: string[];
  values: ApexNonAxisChartSeries;
}

const DoughnutChart = ({ fillColors, values, labels }: DoughnutChartProps) => {
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
    <DoughnutChartWrapper>
      <Chart options={options} series={values} type="donut" width="100%" height="100%" />
    </DoughnutChartWrapper>
  );
};

export default DoughnutChart;
