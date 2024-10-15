import BarChart from "./BarChart";

interface CategoryMenuItemProps {
  month: Date;
  data: { category: string; amount: number }[];
}

const getMonthDetailURL = (link: string, d: Date): string => {
  return (
    link +
    d.toLocaleDateString("de-DE", { year: "numeric" }) +
    "-" +
    d.toLocaleDateString("de-DE", { month: "2-digit" })
  );
};

const getMonthName = (d: Date): string => {
  return d.toLocaleDateString("en-US", { month: "long" });
};

export default function CategoryMenuItem(props: CategoryMenuItemProps) {
  return (
    <div className="rounded-lg shadow-xl text-center p-1">
      <div>{getMonthName(props.month)}</div>
      <div>
        <BarChart data={props.data} />
      </div>
    </div>
  );
}
