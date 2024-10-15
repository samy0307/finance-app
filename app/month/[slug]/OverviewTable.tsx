import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  type: string;
  category: string;
  description: string;
  amount: number;
}

interface OverviewTableProps {
  data: Transaction[];
}

const OverviewTable: React.FC<OverviewTableProps> = ({ data }) => {
  return (
    <div className="grid p-1">
      <Table>
        <TableCaption className="font-bold">
          A list of your recent Transactions.
        </TableCaption>
        <TableHeader className="underline">
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((t) => (
              <TableRow key={t.id}>
                <TableCell
                  className={`font-medium ${
                    t.type === "Income" ? "text-[#556B2F]" : "text-[#B22222]"
                  }`}
                >
                  {t.type}
                </TableCell>
                <TableCell className="text-center">{t.category}</TableCell>
                <TableCell className="text-center">{t.description}</TableCell>
                <TableCell className="text-right">
                  ${t.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OverviewTable;
