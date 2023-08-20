import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import useSWR from "swr";
import { nav } from "../../utils/team";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

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

const Messages = ({ role }) => {
  const router = useRouter();
  const fetcher = (api) => fetch(api).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/message", fetcher, {
    refreshInterval: 300,
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this message?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const res = await fetch("/api/message", {
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
        <aside className="h-full w-full second-bg md:w-[300px] pt-20 md:pt-40">
          <ul className="flex flex-wrap md:block">
            {role === "admin" &&
              nav.admin.map((route) => (
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
              ))}
          </ul>
        </aside>
      </div>
      <div className="flex-1 py-20 px-10 overflow-auto">
        <h1 className="text-center text-5xl">All The Messages</h1>
        {isLoading ? (
          <h2 className="text-center text-4xl my-10">Loading...</h2>
        ) : (
          <>
            {data.messages.length ? (
              data?.messages.map((message) => (
                <motion.div
                  variants={upVariant}
                  initial="hide"
                  whileInView="show"
                  viewport={{ once: true }}
                  key={message._id}
                  className="bg-purple-700 p-8 rounded-3xl my-10 relative"
                >
                  <p className="sm:text-2xl my-10">Name: {message.name}</p>
                  <p className="sm:text-2xl my-10">
                    Whatsapp: {message.whatsapp}
                  </p>
                  <p className="sm:text-2xl my-10">Email: {message.email}</p>
                  <p className="sm:text-2xl my-10">
                    Message: {message.message}
                  </p>
                  <div className="absolute top-10 right-10">
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => handleDelete(message._id)}
                      size={20}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <h2 className="text-center text-4xl my-10">
                There is no messages
              </h2>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Messages;

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

  if (session.user.role !== "admin") {
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
