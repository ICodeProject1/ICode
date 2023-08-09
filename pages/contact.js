import React from "react";
import Image from "next/image";
import {
  FaLocationDot,
  FaPhone,
  FaHeadset,
  FaFacebook,
  FaWhatsapp,
  FaEnvelopesBulk,
} from "react-icons/fa6";
import { useFormik } from "formik";
import { useForm } from "@formspree/react";
import Swal from "sweetalert2";
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

const contact = () => {
  const [state, handleSubmit] = useForm("xrgwejjp");
  const re = /(012|010|011|015)\d{8}/;
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      whatsapp: "",
      email: "",
      message: "",
    },
    onSubmit,
    validate,
  });

  async function validate(values) {
    const errors = {};

    if (!values.firstName || !values.lastName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 20 || values.lastName.length > 20) {
      errors.firstName = "Name must be less than 20 characters";
    }

    if (!values.whatsapp) {
      errors.whatsapp = "Required";
    } else if (!re.test(values.whatsapp)) {
      errors.whatsapp = "Invalid Whatsapp Number";
    } else if (values.whatsapp.length > 11) {
      errors.whatsapp = "Whatsapp Number should be 11 numbers";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid Email";
    }

    if (!values.message) {
      errors.message = "Required";
    } else if (values.message.length < 8) {
      errors.message = "Very Short Message";
    }

    return errors;
  }

  async function onSubmit(values) {
    // console.log(values);
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${values.firstName} ${values.lastName}`,
        whatsapp: values.whatsapp,
        email: values.email,
        message: values.message,
      }),
    });
    await handleSubmit({
      Name: `${values.firstName} ${values.lastName}`,
      Whatsapp: values.whatsapp,
      Email: values.email,
      Message: values.message,
    });

    if (response.ok) {
      Swal.fire("Message Sent!", "Your message has been submitted.", "success");
      values.firstName = "";
      values.lastName = "";
      values.whatsapp = "";
      values.email = "";
      values.message = "";
      console.log(response);
    }
  }

  return (
    <main className="flex justify-center lg:contact-h third-bg">
      <motion.div
        variants={upVariant}
        initial="hide"
        whileInView="show"
        viewport={{ once: true }}
        className="lg:w-4/5 md:mx-10 mb-20 lg:h-[36rem] mt-48 second-bg p-16 lg:p-16 md:p-8 flex flex-col md:flex-row justify-between rounded-2xl lg:gap-20 md:gap-8"
      >
        <div className="md:w-5/12 h-fit primary-bg rounded-2xl p-12 relative lg:bottom-40">
          <div className="mb-8">
            <Image src="/contact.svg" alt="contact" width={192} height={170} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-sm tracking-wider mb-8 font-bold">
            An online programming platform provides courses, tutorials, and
            exercises for learning programming languages. It offers a
            user-friendly interface and can provide personalized learning paths
            and certificates.
          </p>
          <ul className="mb-12">
            <a href="tel:+201223728219">
              <li className="flex items-center text-sm my-4 font-bold">
                <FaPhone className="mr-2 text-base" />
                01223728219
              </li>
            </a>
            <a href="mailto:icodeproject01@gmail.com">
              <li className="flex items-center text-sm my-4 font-bold">
                <FaHeadset className="mr-2 text-base" />
                icodeproject01@gmail.com
              </li>
            </a>
            <li className="flex items-center text-sm my-4 font-bold">
              <FaLocationDot className="mr-2 text-base" />
              Faculty Of Science
            </li>
          </ul>
          <ul className="flex">
            <a
              href="https://www.facebook.com/icodeproject"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="w-7 h-7 bg-[#222] hover:bg-transparent transition-all duration-300 rounded-full flex items-center justify-center mx-2">
                <FaFacebook className="text-base" />
              </li>
            </a>
            <a
              href="https://wa.me/+201223728219"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="w-7 h-7 bg-[#222] hover:bg-transparent transition-all duration-300 rounded-full flex items-center justify-center mx-2">
                <FaWhatsapp className="text-base" />
              </li>
            </a>
            <a
              href="mailto:icodeproject01@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="w-7 h-7 bg-[#222] hover:bg-transparent transition-all duration-300 rounded-full flex items-center justify-center mx-2">
                <FaEnvelopesBulk className="text-base" />
              </li>
            </a>
          </ul>
        </div>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
          className="md:w-7/12 flex flex-col lg:justify-between md:justify-evenly"
        >
          <div className="flex my-6 md:my-0 justify-between gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 contact-input"
              {...formik.getFieldProps("firstName")}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 contact-input"
              {...formik.getFieldProps("lastName")}
            />
          </div>
          {formik.errors.firstName && formik.touched.firstName && (
            <div className="my-2 text-red-600 text-xs text-center">
              {formik.errors.firstName}
            </div>
          )}
          <div className="my-6 md:my-0">
            <input
              type="text"
              placeholder="Your Whats App Number"
              className="w-full contact-input"
              {...formik.getFieldProps("whatsapp")}
            />
          </div>
          {formik.errors.whatsapp && formik.touched.whatsapp && (
            <div className="my-2 text-red-600 text-xs text-center">
              {formik.errors.whatsapp}
            </div>
          )}
          <div className="my-6 md:my-0">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full contact-input"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="my-2 text-red-600 text-xs text-center">
              {formik.errors.email}
            </div>
          )}
          <div className="my-6 md:my-0">
            <textarea
              className="w-full resize-none h-36 p-4 bg-[#222]"
              placeholder="Message"
              {...formik.getFieldProps("message")}
            ></textarea>
          </div>
          {formik.errors.message && formik.touched.message && (
            <div className="my-2 text-red-600 text-xs text-center">
              {formik.errors.message}
            </div>
          )}
          <button
            type="submit"
            className="text-sm w-fit font-light px-6 py-3 bg-white text-black hover:text-white hover:bg-transparent border border-white transition-colors duration-300"
          >
            {state.submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>
    </main>
  );
};

export default contact;
