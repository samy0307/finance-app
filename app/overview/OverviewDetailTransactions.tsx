import TransactionTable from "@/app/overview/OverviewTransactionTable";
import React from "react";

export default function Transactions() {
  return (
    <div className="border border-grey-100 rounded-lg shadow-xl sm:row-span-2 text-center p-1  flex justify-center items-center ">
      <div className="flex justify-center items-center">
        <TransactionTable />
      </div>
    </div>
  );
}
