import GuardedPage from "@/components/GuardedPage";
import { oreTypes } from "@/constants/ore-types";
import Link from "next/link";

export default function Seller() {
  return (
    <GuardedPage role="Seller">
      {Object.entries(oreTypes).map(([key, value]) => (
        <Link key={key} href={value.href}>
          {key}
        </Link>
      ))}
    </GuardedPage>
  );
}
