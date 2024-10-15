import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/service/db";

type CategoryData = {
  [category: string]: number;
};

const getCategoryDataByMonth = async (
  year: number,
  month: number
): Promise<CategoryData> => {
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
  });

  const categoryData = transactions.reduce((acc, transaction) => {
    if (transaction.amount < 0) {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
    }
    return acc;
  }, {} as CategoryData);

  return categoryData;
};

const getCategoryDataForYear = async (
  year: number
): Promise<{ [key: number]: CategoryData }> => {
  const dataByMonth: { [key: number]: CategoryData } = {};

  for (let month = 1; month <= 12; month++) {
    const data = await getCategoryDataByMonth(year, month);
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

  try {
    const data = await getCategoryDataForYear(Number(year));
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
