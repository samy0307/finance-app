import React from "react";
import TotalNetWorth from "./totalNetWorth/TotalNetWorth";
import Transactions from "../../app/overview/OverviewDetailTransactions";
import Income from "./income/Income";
import Aviable from "./aviable/Aviable";
import Expense from "./expense/Expense";

export default function MainContentTop() {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 flex-auto ">
      <TotalNetWorth />
      <Income />
      <Transactions />
      <Aviable />
      <Expense />
    </div>
  );
}
