import React from "react";
import QueryIncome from "@/components/mainContentTop/income/QueryIncome";

export default function Income() {
  return (
    <div className="border border-gray-100 rounded-lg shadow-xl text-center  flex justify-center items-center">
      <div>
        <div className="underline">INCOME</div>
        <div className="flex justify-center items-center">
          <QueryIncome />
        </div>
      </div>
    </div>
  );
}
