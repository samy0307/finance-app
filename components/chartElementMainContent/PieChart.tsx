"use client";

import { Transaction } from "@prisma/client";
import React from "react";
import useSWR from "swr";
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import generateColors from "@/lib/hsl2rgb";

Chartjs.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function PieChart() {
  const { data, error, isLoading } = useSWR<Transaction[]>(
    "/api/income",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const colors = generateColors(0.37, 0.9, 0.3, 0.2, 0.8, data?.length ?? 0);
  console.log("Colors: ", colors);

  const calculateTotal = (data: Transaction[]) => {
    return data.reduce((sum, tr) => sum + tr.amount, 0);
  };

  const totalAmount = data ? calculateTotal(data) : 0;

  const chartData = {
    labels: data?.map((tr) => `${tr.category}: ${tr.amount}`),
    datasets: [
      {
        data: data?.map((tr) => tr.amount).sort((lhs, rhs) => rhs - lhs),
        backgroundColor: colors,
        datalabels: {
          color: "white",
        },
        borderColor: "White",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {},
      legend: {
        display: false,
      },
    },
    cutout: "50%",
  };

  return (
    <div className="relative">
      <Pie data={chartData} options={options} />
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white font-bold">
        {totalAmount} €
      </div>
    </div>
  );
}

export default PieChart;
