import Link from "next/link";

interface OverViewMenuItemProps {
  month: Date;
  income: number;
  expense: number;
  link: string;
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

export default function OverViewMenuItem(props: OverViewMenuItemProps) {
  const roundedIncome = parseFloat(props.income.toFixed(2));
  const roundedExpense = parseFloat(Math.abs(props.expense).toFixed(2));
  const remaining = parseFloat((roundedIncome - roundedExpense).toFixed(2));

  return (
    <div className="grid">
      <div className="rounded-lg shadow-xl text-center p-1">
        <Link href={getMonthDetailURL(props.link, props.month)}>
          <div className="hover:underline">{getMonthName(props.month)}</div>
        </Link>
        <div className="grid col-span-1 sm:grid-cols-2 gap-2 text-xs text-center p-1 bg-g">
          <div className="bg-[#556B2F] rounded-lg shadow-xl p-2">
            <div>Income</div>
            <div>{roundedIncome.toFixed(2)}</div>
          </div>
          <div className="bg-[#B22222] rounded-lg shadow-xl p-2">
            <div>Expense</div>
            <div>{roundedExpense.toFixed(2)}</div>
          </div>
          <div className="sm:col-span-2 col-span-1 bg-[#4169e1] rounded-lg shadow-xl p-2">
            <div>Remaining</div>
            <div>{remaining.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
