import {
  faBuildingColumns,
  faChartSimple,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import NavMenuItem from "./NavMenuItem";

export default function NavbarCenter() {
  return (
    <div className="sm:flex sm:justify-center sm:gap-10">
      <div className="hover:scale-110">
        <NavMenuItem
          title="Overview"
          href="/overview"
          icon={faBuildingColumns}
        />
      </div>
      <div className="hover:scale-110">
        <NavMenuItem
          title="Categories"
          href="/categories"
          icon={faChartSimple}
        />
      </div>
      <div className="hover:scale-110">
        <NavMenuItem
          title="Transactions"
          href="/transactions"
          icon={faMoneyBillTransfer}
        />
      </div>
    </div>
  );
}
