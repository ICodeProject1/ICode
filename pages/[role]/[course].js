import React, { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
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

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Course = ({ data }) => {
  const [show, setShow] = useState(true);
  return (
    <motion.main
      variants={staggerContainer}
      initial="hide"
      animate="show"
      className="flex min-h-screen third-bg"
    >
      <div className="items-stretch">
        <aside className="h-full second-bg w-[200px] pt-40 hidden md:block">
          <ul>
            <li
              className={`text-bold cursor-pointer ${
                show && "text-black bg-white"
              } text-xl my-4 hover:text-black hover:bg-white transition-all duration-300 text-center rounded-full py-2`}
              onClick={() => setShow(true)}
            >
              Description
            </li>
            <li
              className={`text-bold cursor-pointer ${
                !show && "text-black bg-white"
              } text-xl my-4 hover:text-black hover:bg-white transition-all duration-300 text-center rounded-full py-2`}
              onClick={() => setShow(false)}
            >
              PDF
            </li>
          </ul>
        </aside>
      </div>
      <div className="flex-1 py-20 px-10 ">
        <div className="w-full flex flex-col">
          <motion.h1
            variants={upVariant}
            className="text-center text-5xl uppercase"
          >
            {data.title}
          </motion.h1>
          <ul className="block md:hidden">
            <motion.li
              variants={upVariant}
              className={`text-bold cursor-pointer ${
                show && "text-black bg-white"
              } text-xl my-4 hover:text-black hover:bg-white transition-colors duration-300 text-center rounded-full py-2`}
              onClick={() => setShow(true)}
            >
              Description
            </motion.li>
            <motion.li
              variants={upVariant}
              className={`text-bold cursor-pointer ${
                !show && "text-black bg-white"
              } text-xl my-4 hover:text-black hover:bg-white transition-colors duration-300 text-center rounded-full py-2`}
              onClick={() => setShow(false)}
            >
              PDF
            </motion.li>
          </ul>
          {show ? (
            <motion.div variants={upVariant} className="text-lg mt-10 w-full">
              <p className="w-4/5 mx-auto text-2xl md:text-3xl">
                {data.description}
              </p>
            </motion.div>
          ) : (
            <motion.div variants={upVariant} className="py-20 w-full h-[900px]">
              <iframe
                src={data.pdf}
                className="w-full h-full"
                allow="autoplay"
              ></iframe>
            </motion.div>
          )}
        </div>
      </div>
    </motion.main>
  );
};

export default Course;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const role = context.params.role;
  const course = context.params.course;
  const response = await fetch(`http://localhost:3000/api/course/${course}`);
  const data = await response.json();

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

  if (role !== session.user.role) {
    return {
      redirect: {
        destination: `/auth/login?error=You are not authorized`,
        permanent: false,
      },
    };
  }

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session,
      // to secure data rendered
      role,
      data,
    },
  };
}
