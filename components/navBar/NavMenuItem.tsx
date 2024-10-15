import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface NavMenuItemProps {
  title: string;
  href: Url;
  icon: IconProp;
}

export default function NavMenuItem(props: NavMenuItemProps) {
  return (
    <Link href={props.href} className="grid justify-items-center ">
      <div>{props.title}</div>
      <div>
        <FontAwesomeIcon icon={props.icon} className="h-4" />
      </div>
    </Link>
  );
}
