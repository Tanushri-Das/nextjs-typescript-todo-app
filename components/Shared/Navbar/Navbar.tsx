import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Close the menu when route changes
    setIsMenuOpen(false);
  }, [router.asPath]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="ml-2 text-2xl text-white font-bold"
                passHref
              >
                TeuxDeux
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } hidden sm:flex sm:items-center sm:ml-6`}
          >
            <div className="ml-4 flex items-center sm:ml-6 sm:space-x-4">
              <Link
                href="/"
                className="block text-white font-semibold text-lg"
                passHref
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-white font-semibold text-lg"
                passHref
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-white font-semibold text-lg"
                passHref
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block text-white font-semibold text-lg"
              passHref
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-white font-semibold text-lg"
              passHref
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-white font-semibold text-lg"
              passHref
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
