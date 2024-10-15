import prisma from "@/service/db";
import { NextApiRequest, NextApiResponse } from "next";
import { format } from "date-fns";

interface SavingsData {
  month: string;
  amount: number;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await prisma.transaction.findMany({
      where: {
        type: "Savings",
      },
    });

    const result = posts.map((transaction) => ({
      month: format(new Date(transaction.date), "MMMM yyyy"),
      amount: transaction.amount,
    }));

    // Aggregate amounts by month
    const aggregatedResult = result.reduce<SavingsData[]>((acc, curr) => {
      const existing = acc.find(item => item.month === curr.month);
      if (existing) {
        existing.amount += curr.amount;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

    res.status(200).json(aggregatedResult);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}
