import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
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

const Profile = () => {
  const { data: session, update } = useSession({
    required: true,
  });
  const [name, setName] = useState("");
  const [changeName, setChangeName] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [nameError, setNameError] = useState("");

  const [username, setUsername] = useState("");
  const [changeUsername, setChangeUsername] = useState(false);
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const [loadingPassword, setLoadingPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      cPassword: "",
    },
    onSubmit,
    validate,
  });

  async function validate(values) {
    const errors = {};

    if (!values.oldPassword) {
      errors.oldPassword = "Required";
    } else if (
      values.oldPassword.length < 8 ||
      values.oldPassword.length > 20
    ) {
      errors.oldPassword = "Must be greater than 8 and less than 20";
    } else if (values.oldPassword.includes(" ")) {
      errors.oldPassword = "Invalid Password";
    }
    if (!values.newPassword) {
      errors.newPassword = "Required";
    } else if (
      values.newPassword.length < 8 ||
      values.newPassword.length > 20
    ) {
      errors.newPassword = "Must be greater than 8 and less than 20";
    } else if (values.newPassword.includes(" ")) {
      errors.newPassword = "Invalid Password";
    }

    if (!values.cPassword) {
      errors.cPassword = "Required";
    } else if (values.newPassword !== values.cPassword) {
      errors.cPassword = "Password does't match!";
    }

    return errors;
  }

  const updateName = async (name) => {
    setChangeName(false);
    setLoadingName(true);
    const res = await fetch("/api/name", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    const { error } = await res.json();
    if (res.ok) {
      await update({
        ...session,
        user: {
          ...session.user,
          name,
        },
      });
      setNameError(false);
    } else {
      console.log(error);
      setChangeName(true);
      setNameError(error);
    }
    setLoadingName(false);
  };

  const updateUsername = async (username) => {
    setChangeUsername(false);
    setLoadingUsername(true);
    const res = await fetch("/api/username", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });
    const { error } = await res.json();
    if (res.ok) {
      await update({
        ...session,
        user: {
          ...session.user,
          username,
        },
      });
      setUsernameError(false);
    } else {
      console.log(error);
      setChangeUsername(true);
      setUsernameError(error);
    }
    setLoadingUsername(false);
  };

  async function onSubmit(values) {
    setLoadingPassword(true);
    const res = await fetch("/api/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }),
    });
    const { error } = await res.json();
    if (res.ok) {
      console.log(res);
      values.oldPassword = "";
      values.newPassword = "";
      values.cPassword = "";
    } else {
      console.log(error);
      formik.errors.oldPassword = error;
    }
    setLoadingPassword(false);
  }

  return (
    <section className="min-h-screen py-40 third-bg flex flex-col md:flex-row justify-evenly items-center">
      <motion.div
        variants={upVariant}
        initial="hide"
        whileInView="show"
        viewport={{ once: true }}
        className="second-bg flex flex-col justify-around w-4/5 my-10 md:w-2/5 h-[40rem] p-10"
      >
        <div>
          <p className="w-full my-2">Name</p>
          <input
            type="text"
            className="form-input w-full"
            value={name ? name : session?.user.name}
            placeholder="Name"
            readOnly={!changeName}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (
            <div className="my-2 text-red-600 text-xs text-center">
              {nameError}
            </div>
          )}
          <div className="flex justify-between">
            <button
              className={`${changeName ? "buttons" : "disabled"}`}
              disabled={!changeName}
              onClick={() => updateName(name)}
            >
              {loadingName ? "Saving..." : "Save"}
            </button>
            {changeName ? (
              <button
                className="buttons"
                onClick={() => {
                  setChangeName(false);
                  setName(session?.user.name);
                }}
              >
                Cancel
              </button>
            ) : (
              <button className="buttons" onClick={() => setChangeName(true)}>
                Change
              </button>
            )}
          </div>
        </div>
        <div>
          <p className="w-full my-2">Username</p>
          <input
            type="text"
            className="form-input w-full"
            value={username ? username : session?.user.username}
            placeholder="Username"
            readOnly={!changeUsername}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && (
            <div className="my-2 text-red-600 text-xs text-center">
              {usernameError}
            </div>
          )}
          <div className="flex justify-between">
            <button
              className={`${changeUsername ? "buttons" : "disabled"}`}
              disabled={!changeUsername}
              onClick={() => updateUsername(username)}
            >
              {loadingUsername ? "Saving..." : "Save"}
            </button>
            {changeUsername ? (
              <button
                className="buttons"
                onClick={() => {
                  setChangeUsername(false);
                  setUsername(session?.user.name);
                }}
              >
                Cancel
              </button>
            ) : (
              <button
                className="buttons"
                onClick={() => setChangeUsername(true)}
              >
                Change
              </button>
            )}
          </div>
        </div>
      </motion.div>
      <motion.form
        variants={upVariant}
        initial="hide"
        whileInView="show"
        viewport={{ once: true }}
        noValidate
        autoComplete={false}
        onSubmit={formik.handleSubmit}
        className="second-bg flex flex-col justify-around w-4/5 my-10 md:w-2/5 h-[40rem] p-10"
      >
        <h1 className="text-3xl text-center">Change Password</h1>
        <input
          type="password"
          className="form-input w-full"
          placeholder="Old Password"
          {...formik.getFieldProps("oldPassword")}
        />
        {formik.errors.oldPassword && formik.touched.oldPassword && (
          <div className="my-2 text-red-600 text-xs text-center">
            {formik.errors.oldPassword}
          </div>
        )}
        <input
          type="password"
          className="form-input w-full"
          placeholder="New Password"
          {...formik.getFieldProps("newPassword")}
        />
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div className="my-2 text-red-600 text-xs text-center">
            {formik.errors.newPassword}
          </div>
        )}
        <input
          type="password"
          className="form-input w-full"
          placeholder="Confirm Password"
          {...formik.getFieldProps("cPassword")}
        />
        {formik.errors.cPassword && formik.touched.cPassword && (
          <div className="my-2 text-red-600 text-xs text-center">
            {formik.errors.cPassword}
          </div>
        )}
        <button
          className={!loadingPassword ? "buttons" : "disabled"}
          // onClick={updatePassword}
          type="submit"
        >
          {loadingPassword ? "Saving..." : "Save Changes"}
        </button>
      </motion.form>
    </section>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
