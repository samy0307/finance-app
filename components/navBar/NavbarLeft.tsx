import Link from "next/link";
import Image from "next/image";
import logov1 from "@/components/images/logov1.webp";

export default function NavbarLeft() {
  return (
    <Link href="/" className="sm:grid ">
      <div>
        <Image src={logov1} width={70} alt={""} />
      </div>
    </Link>
  );
}
