"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import OverviewTable from "./OverviewTable";

type MonthlyData = {
  id: string;
  type: string;
  category: string;
  description: string;
  amount: number;
};

const fetchIncomeExpenseDataForYear = async (
  year: number
): Promise<{ [key: number]: MonthlyData[] }> => {
  const response = await fetch(`/api/overview-tabelApi?year=${year}`);
  const data = await response.json();
  return data;
};

type PageProps = {
  params: {
    slug: string;
  };
};

const getMonthString = (monthNumber: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1];
};

export default function Page({ params }: PageProps) {
  const position = params.slug.indexOf("-");
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  if (position >= 0 && position < params.slug.length) {
    let testYear = Number(params.slug.substring(0, position));
    let testMonth = Number(params.slug.substring(position + 1));

    if (
      !Number.isNaN(testYear) &&
      !Number.isNaN(testMonth) &&
      testYear >= 2000 &&
      testYear < 2150 &&
      testMonth >= 1 &&
      testMonth <= 12
    ) {
      year = testYear;
      month = testMonth;
    } else {
      let monthText = month < 10 ? "0" + month : "" + month;
      redirect(`/month/${year}-${monthText}`);
    }
  }

  const [dataByMonth, setDataByMonth] = useState<{
    [key: number]: MonthlyData[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIncomeExpenseDataForYear(year);
        setDataByMonth(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const monthData = dataByMonth ? dataByMonth[month] : [];

  return (
    <div className="p-5">
      {getMonthString(month)} {year}
      {monthData.length > 0 ? (
        <OverviewTable data={monthData} />
      ) : (
        <div className="p-3 font-bold">
          No transactions found for this month!
        </div>
      )}
    </div>
  );
}
