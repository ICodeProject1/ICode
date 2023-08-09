import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
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

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { status } = useSession();
  const router = useRouter();
  const { callbackUrl } = router.query;
  // console.log(callbackUrl);

  useEffect(() => {
    const { error } = router.query;
    if (error) {
      setError(error);
    }
  }, [router.query]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit,
  });

  async function validate(values) {
    const errors = {};

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
    return errors;
  }

  async function onSubmit(values) {
    setLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: callbackUrl || "/",
    });

    if (status.ok) {
      setLoading;
      router.push(callbackUrl ? callbackUrl : "/");
    } else {
      console.log(status.error);
      if (status.error === "password") {
        formik.errors.password = "Incorrect password";
      } else if (status.error === "username") {
        formik.errors.username = "No user found with that username";
      }
    }
    setLoading(false);
  }

  return (
    <main className="flex justify-center items-center contact-h third-bg p-2 sm:p-20">
      <motion.div
        variants={upVariant}
        initial="hide"
        whileInView="show"
        viewport={{ once: true }}
        className="sm:w-[40rem] w-full second-bg pt-16 px-4 sm:px-16 rounded-2xl gap-20"
      >
        {error && (
          <div className="my-2 text-red-600 text-base text-center">{error}</div>
        )}
        <h1 className="text-center text-5xl mb-10">Sign In</h1>
        <div>
          <form onSubmit={formik.handleSubmit} className="w-full flex flex-col">
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
                type={show ? "text" : "password"}
                placeholder="Password"
                className="w-full form-input"
                {...formik.getFieldProps("password")}
              />
              {show ? (
                <AiOutlineEyeInvisible
                  size={25}
                  className="absolute cursor-pointer right-4 transform translate-y-[-50%] top-[50%]"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <AiOutlineEye
                  size={25}
                  className="absolute cursor-pointer right-4 transform translate-y-[-50%] top-[50%]"
                  onClick={() => setShow(!show)}
                />
              )}
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="my-2 text-red-600 text-xs text-center">
                {formik.errors.password}
              </div>
            )}
            <button
              disabled={loading}
              type="submit"
              className={loading ? "disabled" : "buttons"}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
};

export default Login;
