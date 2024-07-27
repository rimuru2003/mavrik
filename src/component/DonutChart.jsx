import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ scores }) => {
  const displayScores = scores.map(score => score === 0 ? 0.1 : score);

  const data = {
    labels: scores.map((_, index) => `Test ${index + 1} mark(s)`),
    datasets: [
      {
        data: displayScores,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const score = scores[tooltipItem.dataIndex];
            return `Test ${tooltipItem.dataIndex + 1}: ${score} mark(s)`;
          }
        }
      }
    }
  };

  return (
    <div className="h-72 w-80 ">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
