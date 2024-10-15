import { redirect } from "next/navigation";

type MonthlyData = {
  income: number;
  expense: number;
};

const fetchIncomeExpenseDataForYear = async (
  year: number
): Promise<{ [key: number]: MonthlyData }> => {
  const response = await fetch(`/api/income-expense?year=${year}`);
  const data = await response.json();
  return data;
};

const Overview = () => {
  redirect("overview/" + new Date().getFullYear());
};

export default Overview;
