/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { Menu, X } from 'heroicons-react'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Find an Iron Mine', href: '/buyer', current: false },
  { name: 'Sell Iron Ore', href: '/prediction', current: false },
 
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white text-white">
      {({ open }) => (
        <>
          <div className="min-w-7xl mx-auto bg-slate-700 border-gray-50 px-2 sm:px-6 lg:px-8">
            <div className="relative mx-0 flex h-16 items-center justify-between md:mx-20">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center ">
                  <h1 className="cursor-pointer text-3xl font-bold">
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
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'text-white hover:bg-green-500 hover:shadow-lg',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button className="rounded-md border border-green-500 px-3 py-2 text-sm font-medium text-white hover:bg-green-500 hover:text-white  hover:shadow-lg">
                  <Link href="/signup">Register</Link>
                </button>
                <button className="ml-4 rounded-md border border-green-500 px-3 py-2 text-sm font-medium text-white hover:bg-green-500 hover:text-white  hover:shadow-lg">
                  <Link href="/login">Login</Link>
                </button>
              </div> */}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-green-500 hover:text-white hover:shadow-lg',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}