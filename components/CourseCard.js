import React from "react";
import Link from "next/link";
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

const CourseCard = ({ title, subtitle, image, _id, role }) => {
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete that course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await fetch(`/api/course/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire("Deleted!", "User has been deleted.", "success");
        console.log(data);
      } else {
        Swal.fire("Error Ocurred!", "User has not been deleted.", "error");
        console.log("error");
      }
    }
  };

  return (
    <motion.div
      variants={upVariant}
      initial="hide"
      whileInView="show"
      viewport={{ once: true }}
      className="basis-80 bg-[#282c5a] pb-10 rounded-xl overflow-hidden"
    >
      <div className="w-full h-[150px]">
        <img src={image} alt="image" className="w-full h-full" />
      </div>
      <h1 className="text-center mt-4 text-2xl font-bold capitalize">
        {title}
      </h1>
      <p className="text-center mt-4 text-sm opacity-80 capitalize px-4">
        {subtitle}
      </p>
      <Link href={`/${role}/${_id}`}>
        <button className="text-sm w-fit mt-10 font-light px-6 py-3 bg-white text-black hover:text-white hover:bg-transparent border border-white transition-colors duration-300; mx-auto block">
          Show More
        </button>
      </Link>
      {role.includes("admin") && (
        <button
          onClick={() => handleDelete(_id)}
          className="text-sm w-fit mt-10 font-light px-6 py-3 bg-white text-black hover:text-white hover:bg-transparent border border-white transition-colors duration-300; mx-auto block"
        >
          Delete
        </button>
      )}
    </motion.div>
  );
};

export default CourseCard;
