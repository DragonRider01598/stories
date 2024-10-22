import { useState } from 'react';
import AuthButtons from './components/AuthButtons'

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   const links = [
      { path: "/", label: "Home" },
      { path: "/canvas", label: "Canvas" },
      { path: "/about", label: "About" },
   ];

   return (
      <nav className="bg-gray-800 text-white">
         <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16">
               <div className="flex items-center">
                  <img
                     src="./logo_dark.png"
                     alt="Logo"
                     className="h-auto max-h-8 w-auto"
                  />
                  <div className="hidden md:block">
                     <div className="ml-2 flex items-baseline space-x-4">
                        {links.map((link, index) => (
                           <a
                              key={index}
                              href={link.path}
                              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                           >
                              {link.label}
                           </a>
                        ))}
                     </div>
                  </div>
               </div>

               <AuthButtons />

               {/* Mobile menu button */}
               <div className="-mr-2 flex md:hidden items-center">
                  <button
                     onClick={toggleMenu}
                     type="button"
                     className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                     aria-controls="mobile-menu"
                     aria-expanded="false"
                  >
                     <span className="sr-only">Open main menu</span>
                     {isOpen ? (
                        <svg
                           className="block h-6 w-6"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                           aria-hidden="true"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     ) : (
                        <svg
                           className="block h-6 w-6"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                           aria-hidden="true"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                     )}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile menu */}
         {isOpen && (
            <div className="md:hidden" id="mobile-menu">
               <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {links.map((link, index) => (
                     <a
                        key={index}
                        href={link.path}
                        className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                     >
                        {link.label}
                     </a>
                  ))}
               </div>
            </div>
         )}
      </nav>
   );
};

export default Navbar;