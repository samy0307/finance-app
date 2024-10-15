"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Transaction } from "@prisma/client";
import { createTransaction } from "@/service/transaction";

interface FormValues {
  type: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
  username: string;
}

export default function DemoPage() {
  const [isFormVisible, setFormVisible] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      type: "",
      category: "",
      amount: 0,
      description: "",
      date: new Date(),
      username: "",
    },
  });

  async function onSubmit(values: FormValues) {
    console.log(values);
    let t: Transaction = {
      id: 0,
      type: values.type,
      category: values.category,
      amount: values.amount,
      description: values.description,
      date: values.date,
    };
    await createTransaction(t);
    setFormVisible(false);
  }

  if (!isFormVisible) {
    return (
      <p className="flex justify-center">Transaction created successfully!</p>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label className="block text-sm font-medium">Transaction Type</label>
          <input
            type="text"
            {...register("type", { required: "Type is required" })}
            className={`mt-1 block w-full ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="income or expense"
          />
          {errors.type && (
            <p className="mt-2 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            {...register("category", { required: "Category is required" })}
            className={`mt-1 block w-full ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="category"
          />
          {errors.category && (
            <p className="mt-2 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Descripe your Transaction
          </label>
          <input
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
            className={`mt-1 block w-full ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="description"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="text"
            {...register("amount", {
              required: "Amount is required",
              valueAsNumber: true,
              validate: (value) => {
                if (isNaN(value)) {
                  return "Amount must be a number";
                }
                if (value === 0) {
                  return "Amount cannot be zero";
                }
                return true;
              },
            })}
            className={`mt-1 block w-full ${
              errors.amount ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="€"
          />
          {errors.amount && (
            <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
