import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const FAQ = ({ title, description }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`primary-bg p-6 font-bold leading-[2.2rem] cursor-pointer ${
        !show && "h-fit"
      }`}
      onClick={() => setShow(!show)}
    >
      <div className="flex items-center">
        {show ? <FaMinus /> : <FaPlus />}
        <h4 className="ml-4">{title}</h4>
      </div>
      {show && (
        <p className="mt-3 opacity-80 font-light text-sm">{description}</p>
      )}
    </div>
  );
};

export default FAQ;
