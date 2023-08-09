import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import useSWR from "swr";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

import SideNav from "../../components/SideNav";
import { motion } from "framer-motion";

const upVariant = {
  hide: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
    },
  },
};

const Users = ({ role }) => {
  const fetcher = (api) => fetch(api).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/users", fetcher, {
    refreshInterval: 500,
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete that user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Deleted!", "User has been deleted.", "success");
        console.log(data);
      } else {
        Swal.fire("Error Ocurred!", "User has not been deleted.", "error");
        console.log("error");
      }
    }
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen md:h-screen third-bg">
      <div className="h-full">
        <SideNav role={role} />
      </div>
      <div className="flex-1 py-20 px-10 overflow-auto">
        <h1 className="text-center text-5xl">All The Users</h1>
        {isLoading ? (
          <h2 className="text-center text-4xl">Loading...</h2>
        ) : role === "admin" ? (
          <>
            <motion.div
              variants={upVariant}
              initial="hide"
              whileInView="show"
              viewport={{ once: true }}
              className="sm:flex hidden justify-evenly mt-10 bg-purple-600 p-4"
            >
              <div className="w-1/4 text-center text-lg md:text-xl lg:text-2xl">
                Name
              </div>
              <div className="w-1/4 text-center text-lg md:text-xl lg:text-2xl">
                Username
              </div>
              <div className="w-1/4 text-center text-lg md:text-xl lg:text-2xl">
                Role
              </div>
              <div className="w-1/4"></div>
            </motion.div>
            <h2 className="text-3xl my-10">Admins</h2>
            {data.users.map(
              (user) =>
                user.role === "admin" && (
                  <motion.div
                    variants={upVariant}
                    initial="hide"
                    whileInView="show"
                    viewport={{ once: true }}
                    key={user._id}
                    className="flex flex-col sm:flex-row justify-evenly mt-10 bg-purple-900 p-4"
                  >
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl">
                      <span className="sm:hidden">Name:</span>
                      {user.name}
                    </div>
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl">
                      <span className="sm:hidden">Username:</span>
                      {user.username}
                    </div>
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl capitalize">
                      <span className="sm:hidden">Role:</span>
                      {user.role}
                    </div>
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center">
                      <FaTrash
                        size={30}
                        className="cursor-pointer mx-auto"
                        onClick={() => handleDelete(user._id)}
                      />
                    </div>
                  </motion.div>
                )
            )}
            <h2 className="text-3xl my-10">Sub Admins</h2>
            {data.users.map(
              (user) =>
                user.role !== "admin" &&
                user.role.includes("admin") && (
                  <motion.div
                    variants={upVariant}
                    initial="hide"
                    whileInView="show"
                    viewport={{ once: true }}
                    key={user._id}
                    className="flex flex-col sm:flex-row justify-evenly mt-10 bg-purple-900 p-4"
                  >
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl">
                      <span className="sm:hidden">Name:</span>
                      {user.name}
                    </div>
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl">
                      <span className="sm:hidden">Username:</span>
                      {user.username}
                    </div>
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl capitalize">
                      <span className="sm:hidden">Role:</span>
                      admin {user.role.split("admin")[1].toUpperCase()}
                    </div>
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center">
                      <FaTrash
                        size={30}
                        className="cursor-pointer mx-auto"
                        onClick={() => handleDelete(user._id)}
                      />
                    </div>
                  </motion.div>
                )
            )}
            <h2 className="text-3xl my-10">Users</h2>
            {data.users.map(
              (user) =>
                !user.role.includes("admin") && (
                  <motion.div
                    variants={upVariant}
                    initial="hide"
                    whileInView="show"
                    viewport={{ once: true }}
                    key={user._id}
                    className="flex flex-col sm:flex-row justify-evenly mt-10 bg-purple-900 p-4"
                  >
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl">
                      <span className="sm:hidden">Name:</span>
                      {user.name}
                    </div>
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl">
                      <span className="sm:hidden">Username:</span>
                      {user.username}
                    </div>
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl">
                      <span className="sm:hidden">Role:</span>
                      {user.role.toUpperCase()}
                    </div>
                    <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center">
                      <FaTrash
                        size={30}
                        className="cursor-pointer mx-auto"
                        onClick={() => handleDelete(user._id)}
                      />
                    </div>
                  </motion.div>
                )
            )}
          </>
        ) : (
          <>
            <motion.div
              variants={upVariant}
              initial="hide"
              whileInView="show"
              viewport={{ once: true }}
              className="sm:flex hidden flex-col sm:flex-row justify-evenly mt-10 bg-purple-600 p-4"
            >
              <div className="w-1/4 text-center text-lg md:text-xl lg:text-2xl">
                Name
              </div>
              <div className="w-1/4 text-center text-lg md:text-xl lg:text-2xl">
                Username
              </div>
              <div className="w-1/4 text-center text-lg md:text-xl lg:text-2xl">
                Role
              </div>
              <div className="w-1/4"></div>
            </motion.div>
            {data.users.length ? (
              data.users.map((user) => (
                <motion.div
                  variants={upVariant}
                  initial="hide"
                  whileInView="show"
                  viewport={{ once: true }}
                  key={user._id}
                  className="flex flex-col sm:flex-row justify-evenly mt-10 bg-purple-900 p-4"
                >
                  <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl">
                    <span className="sm:hidden">Name:</span>
                    {user.name}
                  </div>
                  <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl">
                    <span className="sm:hidden">Username:</span>
                    {user.username}
                  </div>
                  <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center text-lg md:text-xl lg:text-2xl">
                    <span className="sm:hidden">Role:</span>
                    {user.role.toUpperCase()}
                  </div>
                  <div className="sm:w-1/4 flex justify-between px-6 my-2 sm:m-0 sm:p-0 sm:justify-center">
                    <FaTrash
                      size={30}
                      className="cursor-pointer mx-auto"
                      onClick={() => handleDelete(user._id)}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <h2 className="text-center text-4xl mt-10">No Users Found!</h2>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Users;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const role = context.params.role;
  const roles = [
    "admin",
    "adminhr",
    "adminpr",
    "adminoc",
    "admincb",
    "adminmm",
    "admintech",
    "hr",
    "pr",
    "oc",
    "cb",
    "mm",
    "tech",
  ];
  const admins = [
    "admin",
    "adminhr",
    "adminpr",
    "adminoc",
    "admincb",
    "adminmm",
    "admintech",
  ];

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?error=You are not authenticated`,
        permanent: false,
      },
    };
  }

  if (!roles.includes(role)) {
    return {
      notFound: true,
    };
  }

  if (!admins.includes(session.user.role)) {
    return {
      redirect: {
        destination: `/auth/login?error=You are not authorized`,
        permanent: false,
      },
    };
  }

  if (role !== session.user.role) {
    return {
      redirect: {
        destination: `/auth/login?error=You are not authorized`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      // to secure data rendered
      role,
    },
  };
}
