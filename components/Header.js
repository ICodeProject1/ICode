import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaBars, FaX } from "react-icons/fa6";
import { motion } from "framer-motion";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [show, setShow] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY === 0) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    };
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <nav
      className={`${
        scroll ? "primary-bg" : "bg-transparent"
      } fixed top-0 w-screen z-50`}
    >
      <div className="mx-10 h-20 flex items-center justify-between">
        <Link href="/">
          <div>
            <Image src="/logo.png" alt="logo" width={32} height={43} />
          </div>
        </Link>
        <ul
          className={`w-[550px] items-center justify-between hidden lg:flex ${
            status === "loading" ? "loading" : "loaded"
          }`}
        >
          <Link href="/">
            <li className="text-sm font-medium hover:text-black transition-colors duration-300 px-2 py-4">
              Home
            </li>
          </Link>
          <Link href="/about">
            <li className="text-sm font-medium hover:text-black transition-colors duration-300 px-2 py-4">
              About
            </li>
          </Link>
          <Link href="/contact">
            <li className="text-sm font-medium hover:text-black transition-colors duration-300 px-2 py-4">
              Contact
            </li>
          </Link>
          {status === "authenticated" && (
            <Link href={`/${session.user.role}`}>
              <li className="text-sm font-medium hover:text-black transition-colors duration-300 px-2 py-4">
                {session.user.role === "admin"
                  ? "Admin Sector"
                  : session.user.role.includes("admin")
                  ? `Admin ${session.user.role
                      .split("admin")[1]
                      .toUpperCase()} Sector`
                  : `${session.user.role.toUpperCase()} Sector`}
              </li>
            </Link>
          )}
          {status === "authenticated" ? (
            <>
              <Link href="/profile">
                <li className="text-lg font-medium hover:text-black transition-colors duration-300 px-2 py-4">
                  Welcome {session.user.name ? session.user.name : "User"}
                </li>
              </Link>
              <li
                onClick={() => signOut()}
                className="text-sm font-medium cursor-pointer bg-white hover:bg-black rounded-full text-black hover:text-white transition-colors duration-300 p-3"
              >
                Log Out
              </li>
            </>
          ) : (
            <Link href="/auth/login">
              <li className="text-sm font-medium bg-white hover:bg-black rounded-full text-black hover:text-white transition-colors duration-300 p-3">
                Sign In
              </li>
            </Link>
          )}
        </ul>
        <div className="block lg:hidden">
          <FaBars
            size={30}
            className="cursor-pointer"
            onClick={() => setShow(true)}
          />
        </div>
      </div>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="w-[80vw] absolute z-50 third-bg lg:hidden top-0 right-0 h-screen p-20"
        >
          <div className="flex justify-end">
            <FaX
              size={20}
              className="cursor-pointer"
              onClick={() => setShow(false)}
            />
          </div>
          <ul
            className={`flex flex-col ${
              status === "loading" ? "loading" : "loaded"
            }`}
          >
            {status === "authenticated" ? (
              <>
                <Link href="/profile">
                  <li
                    onClick={() => setShow(false)}
                    className="text-lg font-medium hover:text-black transition-colors duration-300 px-2 py-4"
                  >
                    Welcome {session.user.name ? session.user.name : "User"}
                  </li>
                </Link>
                <li
                  onClick={() => signOut()}
                  className="text-sm w-fit font-medium cursor-pointer bg-white hover:bg-black rounded-full text-black hover:text-white transition-colors duration-300 p-3"
                >
                  Log Out
                </li>
              </>
            ) : (
              <Link href="/auth/login">
                <li
                  onClick={() => setShow(false)}
                  className="text-sm w-fit font-medium bg-white hover:bg-black rounded-full text-black hover:text-white transition-colors duration-300 p-3"
                >
                  Sign In
                </li>
              </Link>
            )}
            <Link href="/">
              <li
                onClick={() => setShow(false)}
                className="text-base font-medium hover:text-black transition-colors duration-300 px-2 py-4"
              >
                Home
              </li>
            </Link>
            <Link href="/about">
              <li
                onClick={() => setShow(false)}
                className="text-base font-medium hover:text-black transition-colors duration-300 px-2 py-4"
              >
                About
              </li>
            </Link>
            <Link href="/contact">
              <li
                onClick={() => setShow(false)}
                className="text-base font-medium hover:text-black transition-colors duration-300 px-2 py-4"
              >
                Contact
              </li>
            </Link>
            {status === "authenticated" && (
              <Link href={`/${session.user.role}`}>
                <li
                  onClick={() => setShow(false)}
                  className="text-base font-medium hover:text-black transition-colors duration-300 px-2 py-4"
                >
                  {session.user.role === "admin"
                    ? "Admin Sector"
                    : session.user.role.includes("admin")
                    ? `Admin ${session.user.role
                        .split("admin")[1]
                        .toUpperCase()} Sector`
                    : `${session.user.role.toUpperCase()} Sector`}
                </li>
              </Link>
            )}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Header;
