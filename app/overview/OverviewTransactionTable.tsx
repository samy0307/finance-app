import { getTransactionData } from "@/service/transactionQuerry";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function TransactionTable() {
  const data = await getTransactionData();
  return (
    <div className="grid">
      <Table>
        <TableCaption className="font-bold">
          A list of your recent Transactions.
        </TableCaption>
        <TableHeader>
          <TableRow className="text-xs underline">
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((t) => (
            <TableRow key={t.id} className="text-xs">
              <TableCell className="text-left">{t.type}</TableCell>
              <TableCell className=" text-center">{t.category}</TableCell>
              <TableCell className="text-center">{t.description}</TableCell>
              <TableCell className="text-right">
                ${t.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
