import React, { useState } from "react";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { nav } from "../../utils/team";
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

const AddUser = ({ role }) => {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      cpassword: "",
      role: "",
    },
    onSubmit,
    validate,
  });

  async function validate(values) {
    const errors = {};

    if (!values.role) {
      errors.role = "Required";
    }

    if (values.name.length > 20) {
      errors.name = "Name must be less than 20 characters";
    }

    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.includes(" ")) {
      errors.username = "Invalid Username";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8 || values.password.length > 20) {
      errors.password = "Must be greater than 8 and less than 20";
    } else if (values.password.includes(" ")) {
      errors.password = "Invalid Password";
    }

    if (!values.cpassword) {
      errors.cpassword = "Required";
    } else if (values.password !== values.cpassword) {
      errors.cpassword = "Password does't match!";
    }

    return errors;
  }

  async function onSubmit(values) {
    // console.log(values);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        username: values.username,
        password: values.password,
        role: values.role,
      }),
    });

    if (response.ok) {
      router.push("/admin/users");
    } else {
      const data = await response.json();
      console.log(data.message);
      formik.errors.username = data.message;
    }
  }
  return (
    <main className="flex flex-col md:flex-row min-h-screen third-bg">
      <div className="items-stretch">
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
      <motion.div
        variants={upVariant}
        initial="hide"
        whileInView="show"
        viewport={{ once: true }}
        className="flex justify-center items-center flex-1 third-bg p-6 md:p-20"
      >
        <div className="w-full second-bg p-6 md:p-16 rounded-2xl gap-20">
          <h1 className="text-center text-5xl mb-10">Add User</h1>
          <div>
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col"
            >
              <div className=" my-4">
                <input
                  type="text"
                  placeholder="Name (Optional)"
                  className="w-full form-input"
                  {...formik.getFieldProps("name")}
                />
              </div>
              {formik.errors.name && formik.touched.name && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.name}
                </div>
              )}
              <div className=" my-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full form-input"
                  {...formik.getFieldProps("username")}
                />
              </div>
              {formik.errors.username && formik.touched.username && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.username}
                </div>
              )}
              <div className="my-4 relative">
                <input
                  type={show.password ? "text" : "password"}
                  placeholder="Password"
                  className="w-full form-input"
                  {...formik.getFieldProps("password")}
                />
                {show.password ? (
                  <AiOutlineEyeInvisible
                    size={25}
                    className="absolute cursor-pointer right-4 transform translate-y-[-50%] top-[50%]"
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  />
                ) : (
                  <AiOutlineEye
                    size={25}
                    className="absolute cursor-pointer right-4 transform translate-y-[-50%] top-[50%]"
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  />
                )}
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.password}
                </div>
              )}
              <div className="my-4 relative">
                <input
                  type={show.cpassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full form-input"
                  {...formik.getFieldProps("cpassword")}
                />
                {show.cpassword ? (
                  <AiOutlineEyeInvisible
                    size={25}
                    className="absolute cursor-pointer right-4 transform translate-y-[-50%] top-[50%]"
                    onClick={() =>
                      setShow({ ...show, cpassword: !show.cpassword })
                    }
                  />
                ) : (
                  <AiOutlineEye
                    size={25}
                    className="absolute cursor-pointer right-4 transform translate-y-[-50%] top-[50%]"
                    onClick={() =>
                      setShow({ ...show, cpassword: !show.cpassword })
                    }
                  />
                )}
              </div>
              {formik.errors.cpassword && formik.touched.cpassword && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.cpassword}
                </div>
              )}
              <select className="form-input" {...formik.getFieldProps("role")}>
                <option value="">Role</option>
                <option value="admin">Admin</option>
                <option value="adminhr">Admin HR</option>
                <option value="adminpr">Admin PR</option>
                <option value="adminoc">Admin OC</option>
                <option value="admincb">Admin CB</option>
                <option value="adminmm">Admin MM</option>
                <option value="admintech">Admin Tech</option>
                <option value="hr">HR</option>
                <option value="pr">PR</option>
                <option value="cb">CB</option>
                <option value="oc">OC</option>
                <option value="mm">MM</option>
                <option value="tech">Tech</option>
              </select>
              {formik.errors.role && formik.touched.role && (
                <div className="my-2 text-red-600 text-xs text-center">
                  {formik.errors.role}
                </div>
              )}
              <button type="submit" className="buttons">
                Submit
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default AddUser;

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
