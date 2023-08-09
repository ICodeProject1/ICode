import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const upVariant = {
  hide: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

const MemberCard = ({ name, title, facebook, insta, whats, img }) => {
  const [show, setShow] = useState(false);
  return (
    <motion.div
      variants={upVariant}
      initial="hide"
      whileInView="show"
      viewport={{ once: true }}
      onHoverStart={() => setShow(true)}
      onHoverEnd={() => setShow(false)}
      className="bg-[#17192f] relative w-3/5 sm:w-2/5 lg:basis-[400px] box-border  hover:bg-transparent border border-[#17192f] hover:border-[#33057d] rounded-lg p-4"
    >
      <div>
        <Image
          src={img}
          width={400}
          height={400}
          alt="team"
          className="grayscale hover:grayscale-0 max-h-[400px]"
        />
      </div>
      <div>
        <h2 className="text-center text-xl font-bold my-4">{name}</h2>
        <p className="text-center mt-4 opacity-80">{title}</p>
      </div>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute w-12 h-36 primary-bg flex flex-col right-0 top-1/3 rounded-bl-2xl rounded-tl-2xl"
        >
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <div className="w-12 h-12 flex justify-center items-center">
              <FaFacebook size={16} />
            </div>
          </a>
          <a href={insta} target="_blank" rel="noopener noreferrer">
            <div className="w-12 h-12 flex justify-center items-center">
              <FaInstagram size={16} />
            </div>
          </a>
          <a href={whats} target="_blank" rel="noopener noreferrer">
            <div className="w-12 h-12 flex justify-center items-center">
              <FaWhatsapp size={16} />
            </div>
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MemberCard;
