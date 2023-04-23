import { oreTypes } from "@/constants/ore-types";
import Link from "next/link";

export default function Seller() {
  return (
    <div>
      {Object.entries(oreTypes).map(([key, value]) => (
        <Link key={key} href={value.href}>
          {key}
        </Link>
      ))}
    </div>
  );
}
