import React from "react";
import { getAviableData } from "@/service/transactionQuerry";
import NetWorthQuerry from "@/components/mainContentTop/totalNetWorth/NetWorthQuerry";

export default function TotalNetWorth() {
  return (
    <div className="border border-gray-100 rounded-lg shadow-xl text-center  flex justify-center items-center">
      <div>
        <div className="underline">TOTAL NET WORTH</div>
        <div className="flex justify-center items-center">
          <NetWorthQuerry />
        </div>
      </div>
    </div>
  );
}
