import GuardedPage from "@/components/GuardedPage";
import { oreTypes } from "@/constants/ore-types";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Seller() {
  return (
    <>
    <Navbar/>
      <GuardedPage role="Seller">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
            Select Ore Type
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 items-center">
            {Object.entries(oreTypes).map(([key, value]) => (
              <Link key={key} href={value.href}>
                <div className="bg-green-500 hover:bg-green-600 rounded-lg shadow-lg p-4 cursor-pointer text-xl text-center font-bold text-white">
                  {key}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </GuardedPage>
    </>
  );
}
