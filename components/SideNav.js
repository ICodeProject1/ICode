import React from "react";
import { useRouter } from "next/router";
import { nav } from "../utils/team";
import Link from "next/link";

const SideNav = ({ role }) => {
  const router = useRouter();
  return (
    <aside
      className={`h-full w-full second-bg md:w-[300px] pt-20 md:pt-40 ${
        !role.includes("admin") && "hidden"
      }`}
    >
      <ul className="flex flex-wrap md:block">
        {role === "admin"
          ? nav.admin.map((route) => (
              <Link key={route.path} href={`/admin${route.path}`}>
                <li
                  className={`text-bold text-2xl my-10 hover:text-black hover:bg-white transition-all duration-300 mx-4 p-2 ${
                    router.asPath === `/admin${route.path}` &&
                    "text-black bg-white"
                  } text-center rounded-full `}
                >
                  {route.title}
                </li>
              </Link>
            ))
          : role.includes("admin")
          ? nav.subAdmin.map((route) => (
              <Link key={route.path} href={`/${role}${route.path}`}>
                <li
                  className={`text-bold text-2xl my-10 hover:text-black hover:bg-white transition-all duration-300 mx-4 p-2  ${
                    router.asPath === `/${role}${route.path}` &&
                    "text-black bg-white"
                  } text-center rounded-full `}
                >
                  {route.title}
                </li>
              </Link>
            ))
          : null}
        {role === "adminhr" && (
          <Link href="/adminhr/table">
            <li
              className={`text-bold text-2xl my-10 hover:text-black hover:bg-white transition-all duration-300 mx-4 p-2  ${
                router.asPath === "/adminhr/table" && "text-black bg-white"
              } text-center rounded-full `}
            >
              Table
            </li>
          </Link>
        )}
      </ul>
    </aside>
  );
};

export default SideNav;
