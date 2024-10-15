import React from "react";
import QueryExpense from "../expense/QueryExpenses";

export default function Expense() {
  return (
    <div className="border border-gray-100 rounded-lg shadow-xl text-center  flex justify-center items-center">
      <div>
        <div className="underline">Expense</div>
        <div className="flex justify-center items-center">
          <QueryExpense />
        </div>
      </div>
    </div>
  );
}
