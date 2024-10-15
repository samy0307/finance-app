"use server";

import prisma from "@/service/db";
import { Transaction } from "@prisma/client";

export async function createTransaction(t: Transaction) {
  console.log("service/transaction.tsx createTransaction", t);
  const trans = await prisma.transaction.create({
    data: {
      type: t.type,
      category: t.category,
      amount: t.amount,
      description: t.description,
      date: t.date,
    },
  });
  console.log("New record: ", trans);
  return trans;
}

export async function readAllTransactions() {
  return [];
}

export async function getTotalIncome() {
  let incomes = await prisma.transaction.findMany({
    select: {
      amount: true,
    },
    where: {
      amount: {
        gt: 0,
      },
      date: {
        gte: new Date("2024-05-01"),
        lt: new Date("2024-06-01"),
      },
    },
  });
  return incomes.reduce((sum, value) => (sum += value.amount), 0);
}

export async function getTotalExpense() {
  return 0;
}
