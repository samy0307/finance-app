import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/service/db";

type MonthlyData = {
  id: number;
  type: string;
  category: string;
  description: string;
  amount: number;
};

const getIncomeExpenseDataByMonth = async (
  year: number,
  month: number
): Promise<MonthlyData[]> => {
  const transactions = await prisma.transaction.findMany({
    where: {
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
    orderBy: {
      amount: "desc", // Sortiere nach Betrag in absteigender Reihenfolge
    },
  });

  return transactions.map((transaction) => ({
    id: transaction.id,
    type: transaction.type,
    category: transaction.category,
    description: transaction.description || "",
    amount: transaction.amount,
  }));
};

const getIncomeExpenseDataForYear = async (
  year: number
): Promise<{ [key: number]: MonthlyData[] }> => {
  let dataByMonth: { [key: number]: MonthlyData[] } = {};

  for (let month = 1; month <= 12; month++) {
    const monthData = await getIncomeExpenseDataByMonth(year, month);
    dataByMonth[month] = monthData;
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
