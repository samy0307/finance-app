import { getExpenseData } from "@/service/transactionQuerry";

export default async function QueryExpense() {
  const data = await getExpenseData();
  const totalExpense = data.reduce((acc, curr) => acc + curr.amount, 0);

  const formattedBalance = totalExpense.toFixed(2);

  return (
    <div className="text-lg font-bold py-1">
      <div>{formattedBalance}€</div>
    </div>
  );
}
