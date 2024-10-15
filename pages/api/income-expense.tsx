import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/service/db";

type MonthlyData = {
  income: number;
  expense: number;
};

const getIncomeExpenseDataByMonth = async (
  year: number,
  month: number
): Promise<MonthlyData> => {
  const incomeData = await prisma.transaction.findMany({
    where: {
      type: "Income",
      AND: [
        {
          date: {
            gte: new Date(year, month - 1, 1),
          },
        },
        {
          date: {
            lt: new Date(year, month, 1),
          },
        },
      ],
    },
  });

  const expenseData = await prisma.transaction.findMany({
    where: {
      type: "Expense",
      AND: [
        {
          date: {
            gte: new Date(year, month - 1, 1),
          },
        },
        {
          date: {
            lt: new Date(year, month, 1),
          },
        },
      ],
    },
  });

  const totalIncome = incomeData.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const totalExpense = expenseData.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return {
    income: parseFloat(totalIncome.toFixed(2)),
    expense: parseFloat(totalExpense.toFixed(2)),
  };
};

const getIncomeExpenseDataForYear = async (
  year: number
): Promise<{ [key: number]: MonthlyData }> => {
  let dataByMonth: { [key: number]: MonthlyData } = {};

  for (let month = 1; month <= 12; month++) {
    let data = await getIncomeExpenseDataByMonth(year, month);
    dataByMonth[month] = data;
  }

  return dataByMonth;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { year } = req.query;
  if (!year) {
    res.status(400).json({ error: "Year is required" });
    return;
  }

  const data = await getIncomeExpenseDataForYear(Number(year));
  res.status(200).json(data);
};
