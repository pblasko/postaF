import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js regisztrálása
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: React.FC = () => {
  // Az adatok
  const data = {
    labels: [],
    datasets: [
      {
        data: [44, 101],
        backgroundColor: [
            '#ffc409',
            '#1a5732'
        ],
        hoverBackgroundColor: [
          '#e0ac08',
          '#174d2c'
        ],
      },
    ],
  };

  // Opciók
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;