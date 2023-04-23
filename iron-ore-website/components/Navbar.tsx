import { Disclosure } from "@headlessui/react";
import { Menu, X } from "heroicons-react";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Find", href: "/buyer", current: false },
  { name: "Sell", href: "/prediction", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="text-white bg-white">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto min-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16 mx-0 md:mx-20">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-white rounded-md hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0 ">
                  <h1 className="text-3xl font-bold cursor-pointer text-slate-700">
                    Fero<span className="text-green-500">City</span>
                  </h1>
                </div>
                <div className="hidden sm:ml-6 sm:block md:ml-60">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-green-500 text-white shadow-lg"
                            : "text-slate-700 hover:bg-green-500 hover:text-white hover:shadow-lg",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button className="px-3 py-2 text-sm font-medium text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white hover:shadow-lg">
                  <Link href="/signup">Register</Link>
                </button>
                <button className="px-3 py-2 ml-4 text-sm font-medium text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white hover:shadow-lg">
                  <Link href="/login">Login</Link>
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-green-500 text-white shadow-lg"
                      : "text-slate-700 hover:bg-green-500 hover:text-white hover:shadow-lg",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
