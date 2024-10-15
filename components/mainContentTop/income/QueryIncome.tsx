import { getIncomeData } from "@/service/transactionQuerry";

export default async function QueryIncome() {
  const data = await getIncomeData();
  const totalIncome = data.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="text-2xl font-bold py-1">
      <div>{totalIncome}€</div>
    </div>
  );
}
