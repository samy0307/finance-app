import React from "react";
import PieChart from "../chartElementMainContent/PieChart";

export default function ExpensesDiagram() {
  return (
    <div className="border border-gray-100 rounded-lg shadow-xl p-1 text-center">
      <div className="underline">TOTAL INCOME CHART</div>
      <div className="p-3">
        <PieChart />
      </div>
    </div>
  );
}
