import React from "react";
import BarChart from "../chartElementMainContent/BarChart";

export default function MonthlyTracking() {
  return (
    <div className="border border-gray-100 rounded-lg shadow-xl sm:col-span-2 text-center p-1">
      <div className="underline">TOTAL EXPENSES CHART</div>
      <div>
        <BarChart />
      </div>
    </div>
  );
}
