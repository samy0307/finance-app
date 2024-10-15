import prisma from "@/service/db";

const getTransactionData = async () => {
  let d = await prisma.transaction.findMany({
    take: 5,
  });
  return d;
};

const getIncomeData = async () => {
  let d = await prisma.transaction.findMany({
    where: {
      type: {
        equals: "Income",
      },
    },
  });
  return d;
};

const getExpenseData = async () => {
  let d = await prisma.transaction.findMany({
    where: {
      type: {
        in: ["Expense", "Savings"],
      },
    },
  });
  return d;
};

const getAviableData = async () => {
  let d = await prisma.transaction.findMany({
    orderBy: {
      amount: "desc",
    },
  });
  return d;
};

export { getTransactionData, getIncomeData, getExpenseData, getAviableData };
