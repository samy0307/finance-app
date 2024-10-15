"use client";
import { useEffect, useState } from "react";
import OverViewMenuItem from "@/components/overViewMenu/overViewMenuItem";
import CircleLoader from "react-spinners/CircleLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

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

type PageProps = {
  params: {
    slug: string;
  };
};

const Overview = ({ params }: PageProps) => {
  const year = Number(params.slug);
  const [dataByMonth, setDataByMonth] = useState<{
    [key: number]: MonthlyData;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          console.log("fetchIncomeExpenseDataForYear", year);
          const data = await fetchIncomeExpenseDataForYear(year);
          setDataByMonth(data);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Failed to fetch data");
        } finally {
          setLoading(false);
        }
      }, 1000);
    };

    fetchData();
  }, [year]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <CircleLoader
            color={"blue"}
            loading={loading}
            cssOverride={override}
            size={50}
          />
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-10">
      {Object.keys(dataByMonth).map((month) => {
        const monthData = dataByMonth[Number(month)];
        return (
          <OverViewMenuItem
            key={month}
            month={new Date(year, Number(month) - 1)}
            income={monthData.income}
            expense={monthData.expense}
            link="/month/"
          />
        );
      })}
    </div>
  );
};

export default Overview;
