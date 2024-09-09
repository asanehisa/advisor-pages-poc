import { useState, Fragment } from "react";
import { Image } from "@yext/pages-components";
import { useDocument } from "@yext/pages/util";
import { FinancialprofessionalStream } from "../types/autogen";
import "./index.css";
import { EntityField } from "@yext/visual-editor";
import { CTA } from "./atoms/cta";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const { _site, mainPhone } = useDocument<FinancialprofessionalStream>();
  const { logo, c_headerCTAs } = _site;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const MenuItems = () => (
    <ul className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-8">
      <EntityField displayName="Header CTAs" fieldId="_site.c_headerCTAs">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
          {c_headerCTAs
            .filter((cta) => cta.name)
            .map((cta, idx) => (
              <li key={idx} className="flex items-center">
                <CTA variant={"link"} label={cta.name} url={cta.link ?? "#"} />
              </li>
            ))}
        </div>
      </EntityField>

      <li className="flex items-center">
        <EntityField displayName="Phone" fieldId="mainPhone">
          <CTA
            variant={"link"}
            label={formatPhoneNumber(mainPhone)}
            url={`tel:${mainPhone}`}
          />
        </EntityField>
      </li>
      <li>
        <CTA variant={"primary"} label={"Contact Me"} url={"#"} />
      </li>
    </ul>
  );

  return (
    <header className="w-full bg-white components">
      <div className="mx-auto flex max-w-6xl flex-1 items-center justify-between px-4 py-6">
        {logo && (
          <EntityField fieldId="_site.logo" displayName="Logo">
            <Image layout="fixed" width={64} height={64} image={logo} />
          </EntityField>
        )}

        <div className="hidden md:flex md:items-center md:justify-end md:space-x-4">
          <MenuItems />
        </div>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          {logo && (
                            <EntityField
                              fieldId="_site.logo"
                              displayName="Logo"
                            >
                              <Image
                                layout="fixed"
                                width={40}
                                height={40}
                                image={logo}
                              />
                            </EntityField>
                          )}
                          <button
                            type="button"
                            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="space-y-6">
                          <MenuItems />
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <a
                            href={`tel:${mainPhone}`}
                            className="flex items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            <Phone className="mr-2 h-5 w-5" />
                            {formatPhoneNumber(mainPhone)}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

export { Header };
