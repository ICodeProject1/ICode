import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import useSWR from "swr";
import SideNav from "../../components/SideNav";
import CourseCard from "../../components/CourseCard";

const Admin = ({ role }) => {
  const fetcher = (api) => fetch(api).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/courses", fetcher, {
    refreshInterval: 300,
  });
  // console.log(data.courses);

  const sectors = ["hr", "pr", "cb", "oc", "mm", "tech"];

  return (
    <main className="flex flex-col md:flex-row min-h-screen md:h-screen third-bg">
      <div className="items-stretch">
        <SideNav role={role} />
      </div>
      <div className="flex-1 py-20 px-10 md:overflow-auto">
        <h1 className="text-center text-5xl">All The Courses</h1>
        {isLoading ? (
          <h2 className="text-center text-4xl mt-10">Loading...</h2>
        ) : role === "admin" ? (
          <>
            {sectors.map((sector) => (
              <div key={sector}>
                <h2 className="text-3xl my-10">
                  {sector.toUpperCase()} Courses
                </h2>
                <div className="flex w-full justify-evenly flex-wrap gap-5">
                  {data.courses.map(
                    (course) =>
                      course.type === sector && (
                        <CourseCard key={course._id} {...course} role={role} />
                      )
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2 className="text-3xl my-10">
              {role.includes("admin")
                ? role.split("admin")[1].toUpperCase()
                : role.toUpperCase()}{" "}
              Courses
            </h2>
            <div className="flex w-full justify-evenly flex-wrap gap-5">
              {data.courses.map((course) => (
                <CourseCard key={course._id} {...course} role={role} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Admin;

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
