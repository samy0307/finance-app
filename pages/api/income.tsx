import prisma from "@/service/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.transaction.groupBy({
    by: ["type", "category"],
    where: {
      amount: {
        gt: 0,
      },
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "asc",
      },
    },
  });

  const results = posts.map((transaction) => ({
    type: transaction.type,
    category: transaction.category,
    amount: transaction._sum.amount,
  }));
  res.json(results);
}
