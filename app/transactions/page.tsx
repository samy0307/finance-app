import React from "react";
import Dialoge from "@/app/transactions/TransactionPopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

function transactions() {
  return (
    <main>
      <div className="flex justify-center p-10">
        <Dialoge />
      </div>
      <div className="flex justify-center">
        <FontAwesomeIcon icon={faMoneyBillTransfer} className="h-40" />
      </div>
    </main>
  );
}

export default transactions;
