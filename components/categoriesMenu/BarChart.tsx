"use client";

import React from "react";
import {
  Chart as Chartjs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import generateColors from "@/lib/hsl2rgb";

Chartjs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
  data: { category: string; amount: number }[];
}

function BarChart({ data }: BarChartProps) {
  const sortedData = [...data].sort((a, b) => a.amount - b.amount);

  const colors = generateColors(0, 0.9, 0.3, 0.2, 0.8, data?.length ?? 0);
  console.log("Colors: ", colors);

  const chartData = {
    labels: sortedData.map((tr) => tr.category),
    datasets: [
      {
        label: "Amount",
        data: sortedData.map((tr) => tr.amount),
        backgroundColor: colors,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChart;
