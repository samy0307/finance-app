import React from "react";
import MonthlyTracking from "./ExpenseChart";
import ExpensesDiagram from "./IncomeChart";

export default function MainContentBottom() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 flex-grow">
      <MonthlyTracking />
      <ExpensesDiagram />
    </div>
  );
}
