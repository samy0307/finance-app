import { redirect } from "next/navigation";

type CategoryData = {
  [category: string]: number;
};

const fetchCategoryData = async (
  year: number
): Promise<{ [key: number]: CategoryData }> => {
  const response = await fetch(`/api/category-year?year=${year}`);
  const data = await response.json();
  return data;
};

const Category = () => {
  redirect("categories/" + new Date().getFullYear());
};

export default Category;
