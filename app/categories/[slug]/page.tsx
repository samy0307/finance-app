"use client";
import CategoryMenuItem from "@/components/categoriesMenu/CategoryMenuItem";
import { useState, useEffect } from "react";
import CircleLoader from "react-spinners/CircleLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

type CategoryDataProps = {
  [category: string]: number;
};

const fetchCategoryData = async (
  year: number
): Promise<{ [key: number]: CategoryDataProps }> => {
  const response = await fetch(`/api/category-year?year=${year}`);
  const data = await response.json();
  return data;
};

type PageProps = {
  params: {
    slug: string;
  };
};

const Category = ({ params }: PageProps) => {
  const year = Number(params.slug);
  const [dataByMonth, setDataByMonth] = useState<{
    [key: number]: CategoryDataProps;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const data = await fetchCategoryData(year);
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
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-6 p-10">
      {Object.keys(dataByMonth).map((month) => {
        const monthData = Object.keys(dataByMonth[Number(month)]).map(
          (category) => ({
            category,
            amount: dataByMonth[Number(month)][category],
          })
        );
        return (
          <CategoryMenuItem
            key={month}
            month={new Date(year, Number(month) - 1)}
            data={monthData}
          />
        );
      })}
    </div>
  );
};

export default Category;
