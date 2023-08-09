import React, { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useFormik } from "formik";
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

import SideNav from "../../components/SideNav";

const AddCourse = ({ role }) => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      image: "",
      pdf: "",
      type: role === "admin" ? "" : role.split("admin")[1],
      order: "",
    },
    onSubmit,
    validate,
  });

  async function validate(values) {
    const errors = {};

    if (!values.title) {
      errors.title = "Required";
    }
    if (!values.subtitle) {
      errors.subtitle = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    if (!values.image) {
      errors.image = "Required";
    }
    if (!values.pdf) {
      errors.pdf = "Required";
    }
    if (!values.type) {
      errors.type = "Required";
    }
    if (!values.order) {
      errors.order = "Required";
    }
    if (!Number.isInteger(+values.order)) {
      errors.order = "Please enter a valid number";
    }

    return errors;
  }

  async function onSubmit(values) {
    // console.log(values);
    setLoading(true);
    const response = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        image: values.image,
        pdf: values.pdf,
        type: values.type,
        order: +values.order,
      }),
    });

    if (response.ok) {
      router.push(`/${role}`);
    } else {
      const { message } = await response.json();
      formik.errors.order = message;
    }
    setLoading(false);
  }
  return (
    <main className="flex flex-col md:flex-row min-h-screen third-bg">
      <div className="items-stretch">
        <SideNav role={role} />
      </div>
      <motion.div
        variants={upVariant}
        initial="hide"
        whileInView="show"
        viewport={{ once: true }}
        className="flex-1 third-bg p-6 md:p-20 overflow-y-auto"
      >
        <div className="second-bg p-6 md:p-16 rounded-2xl gap-20 mx-auto">
          <h1 className="text-center text-5xl mb-10">Add Course</h1>
          <div>
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col"
            >
              <div className=" my-4">
                <input
                  type="text"
                  placeholder="Order"
                  className="w-full form-input"
                  {...formik.getFieldProps("order")}
                />
              </div>
              {formik.errors.order && formik.touched.order && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.order}
                </div>
              )}
              <div className=" my-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full form-input"
                  {...formik.getFieldProps("title")}
                />
              </div>
              {formik.errors.title && formik.touched.title && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.title}
                </div>
              )}
              <div className=" my-4">
                <input
                  type="text"
                  placeholder="Subtitle"
                  className="w-full form-input"
                  {...formik.getFieldProps("subtitle")}
                />
              </div>
              {formik.errors.subtitle && formik.touched.subtitle && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.subtitle}
                </div>
              )}
              <div className="my-4">
                <input
                  type="text"
                  placeholder="Image"
                  className="w-full form-input"
                  {...formik.getFieldProps("image")}
                />
              </div>
              {formik.errors.image && formik.touched.image && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.image}
                </div>
              )}
              <div className="my-4">
                <textarea
                  type="text"
                  placeholder="Description"
                  className="w-full resize-none h-36 p-4 bg-[#222]"
                  {...formik.getFieldProps("description")}
                />
              </div>
              {formik.errors.description && formik.touched.description && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.description}
                </div>
              )}
              <div className="my-4">
                <input
                  type="text"
                  placeholder="PDF"
                  className="w-full form-input"
                  {...formik.getFieldProps("pdf")}
                />
              </div>
              {formik.errors.pdf && formik.touched.pdf && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.pdf}
                </div>
              )}
              <select className="form-input" {...formik.getFieldProps("type")}>
                {role === "admin" ? (
                  <>
                    <option value="">Type</option>
                    <option value="hr">HR</option>
                    <option value="pr">PR</option>
                    <option value="cb">CB</option>
                    <option value="oc">OC</option>
                    <option value="mm">MM</option>
                    <option value="tech">Tech</option>
                  </>
                ) : (
                  <>
                    <option value={`${role.split("admin")[1]}`}>
                      {role.split("admin")[1].toUpperCase()}
                    </option>
                  </>
                )}
              </select>
              {formik.errors.type && formik.touched.type && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.type}
                </div>
              )}
              <button
                type="submit"
                className={Loading ? "disabled" : "buttons"}
              >
                {Loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default AddCourse;

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
