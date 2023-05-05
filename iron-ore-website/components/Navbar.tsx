import { auth } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  MenuOutline,
  BellOutline,
  XOutline,
  UserOutline,
} from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Buy", href: "/buyer" },
  { name: "Sell", href: "/seller" },
  // { name: "Prediction", href: "/prediction" },
];

const register = [
  { name: "Register", href: "/signup" },
  { name: "Login", href: "/login" }
]

const userNav = [{ name: "Profile", href: "/profile" }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const { user, removeUser } = useUserStore();

  function signOut() {
    auth.signOut();
    removeUser();
    router.push("/");
  }

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="container px-2 mx-auto">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XOutline className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuOutline className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <h1 className="text-3xl font-bold cursor-pointer text-slate-700">
                    Fero<span className="text-green-500">City</span>
                  </h1>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          router.pathname === item.href
                            ? "bg-green-500 text-white shadow-lg"
                            : "text-slate-700 hover:bg-green-500 hover:text-white hover:shadow-lg",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {auth.currentUser ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex p-2 text-sm rounded-full border-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        {auth.currentUser?.photoURL ? (
                          <img
                            className="w-8 h-8 rounded-full"
                            src={auth.currentUser?.photoURL}
                            alt=""
                          />
                        ) : (
                          <UserOutline />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNav.map((item) => (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={signOut}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {register.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            router.pathname === item.href
                              ? "bg-green-500 text-white shadow-lg"
                              : "text-green-500 border border-green-500 hover:bg-green-500 hover:text-white hover:shadow-lg",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
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
                    router.pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "hover:bg-green-500 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {register.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    router.pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "hover:bg-green-500 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
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
