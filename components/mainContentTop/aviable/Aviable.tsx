import React from "react";
import QueryAviable from "../aviable/QueryAvailable";

export default function Aviable() {
  return (
    <div className="border border-gray-100 rounded-lg shadow-xl text-center  flex justify-center items-center">
      <div>
        <div className="underline"> AVAILABLE BALANCE</div>
        <div className="flex justify-center items-center">
          <QueryAviable />
        </div>
      </div>
    </div>
  );
}
