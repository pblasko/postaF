import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  chartdata: number[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ chartdata }) => {
  const chartRef = useRef<any>(null);

  const exportChartAsImage = () => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      // A canvas DOM elem elérése
      const canvas = chartInstance.canvas;
      // A kép Base64 formátumban
      const image = canvas.toDataURL('image/png');
      console.log(image); // Ezt küldheted tovább vagy megjelenítheted
    }
  };

  const data = {
    labels: [],
    datasets: [
      {
        data: chartdata,
        backgroundColor: ['#ffc409', '#168a4a'],
        hoverBackgroundColor: ['#e0ac08', '#174d2c'],
      },
    ],
  };

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

  return (
    <div>
      <Doughnut ref={chartRef} data={data} options={options} />
      <button onClick={exportChartAsImage}>Export as Image</button>
    </div>
  );
};

export default DoughnutChart;