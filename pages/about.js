import React from "react";
import Image from "next/image";
import {
  FaPeopleGroup,
  FaUsersBetweenLines,
  FaGraduationCap,
} from "react-icons/fa6";

import { team } from "../utils/team";
import MemberCard from "../components/MemberCard";
import { motion } from "framer-motion";

const upVariant = {
  hide: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const about = () => {
  return (
    <main>
      <section className="w-screen third-bg pt-28 pb-16 flex justify-center">
        <div className="w-4/5 flex-col md:flex-row flex gap-20">
          <div className="md:w-2/5 w-full animate-fadeIn flex items-center justify-center">
            <Image src="/about.png" alt="about" width={440} height={380} />
          </div>
          <div className="flex flex-col justify-between md:w-3/5 ">
            <motion.h1
              variants={upVariant}
              initial="hide"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 1, type: "tween" }}
              className="text-4xl text-center md:text-left font-extrabold leading-5"
            >
              Our Goals
            </motion.h1>
            <motion.p
              variants={upVariant}
              initial="hide"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1, type: "tween" }}
              className="leading-5 text-center md:text-left text-base text-bold my-4"
            >
              Our goals: Empower you to code your dreams, transform beginners
              into pros, and provide top-notch education to fuel tech's future.
            </motion.p>
            <motion.div
              variants={upVariant}
              initial="hide"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1, type: "tween" }}
              className="flex flex-wrap sm:flex-nowrap gap-6 justify-center sm:justify-between"
            >
              <div className="p-8 flex flex-col items-center justify-between h-[200px] bg-[#17192f] w-1/3 rounded-xl basis-[200px]">
                <div className="w-10 h-9 flex items-center justify-center rounded-2xl bg-[#d63031]">
                  <FaPeopleGroup className="w-5 h-4" />
                </div>
                <h3 className="text-2xl font-bold">100+</h3>
                <p className="tracking-wider">Staff</p>
              </div>
              <div className="p-8 flex flex-col items-center justify-between h-[200px] bg-[#17192f] w-1/3 rounded-xl basis-[200px]">
                <div className="w-10 h-9 flex items-center justify-center rounded-2xl bg-[#00b894]">
                  <FaGraduationCap className="w-5 h-4" />
                </div>
                <h3 className="text-2xl font-bold">60+</h3>
                <p className="tracking-wider">Courses</p>
              </div>
              <div className="p-8 flex flex-col items-center justify-between h-[200px] bg-[#17192f] w-1/3 rounded-xl basis-[200px]">
                <div className="w-10 h-9 flex items-center justify-center rounded-2xl ">
                  <FaUsersBetweenLines className="w-5 h-4" />
                </div>
                <h3 className="text-2xl font-bold">100+</h3>
                <p className="tracking-wider">Students</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="w-screen second-bg py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Out Team</h2>
        <div className="w-4/5">
          <h3 className="text-2xl my-12 font-bold">High Board</h3>
          <div className="flex flex-wrap justify-evenly gap-6 mb-20 border-b-2 py-8 border-black border-dashed">
            {team.map(
              (member) =>
                member.role === "High Board" && (
                  <MemberCard key={member.name} {...member} />
                )
            )}
          </div>
          <h3 className="text-2xl my-12 font-bold">Technical</h3>
          <div className="flex flex-wrap justify-evenly gap-6 border-b-2 py-8 border-black border-dashed">
            {team.map(
              (member) =>
                member.role === "Technical" && (
                  <MemberCard key={member.name} {...member} />
                )
            )}
          </div>
          <h3 className="text-2xl my-12 font-bold">Public Relations</h3>
          <div className="flex flex-wrap justify-evenly gap-6 border-b-2 py-8 border-black border-dashed">
            {team.map(
              (member) =>
                member.role === "Public Relations" && (
                  <MemberCard key={member.name} {...member} />
                )
            )}
          </div>
          <h3 className="text-2xl my-12 font-bold">Human Resources</h3>
          <div className="flex flex-wrap justify-evenly gap-6 border-b-2 py-8 border-black border-dashed">
            {team.map(
              (member) =>
                member.role === "Human Resources" && (
                  <MemberCard key={member.name} {...member} />
                )
            )}
          </div>
          <h3 className="text-2xl my-12 font-bold">Capacity Building</h3>
          <div className="flex flex-wrap justify-evenly gap-6 border-b-2 py-8 border-black border-dashed">
            {team.map(
              (member) =>
                member.role === "Capacity Building" && (
                  <MemberCard key={member.name} {...member} />
                )
            )}
          </div>
          <h3 className="text-2xl my-12 font-bold">
            Organization and Logistics
          </h3>
          <div className="flex flex-wrap justify-evenly gap-6 border-b-2 py-8 border-black border-dashed">
            {team.map(
              (member) =>
                member.role === "Organization" && (
                  <MemberCard key={member.name} {...member} />
                )
            )}
          </div>
          <h3 className="text-2xl my-12 font-bold">Multi Media</h3>
          <div className="flex flex-wrap justify-evenly gap-6 border-b-2 py-8 border-black border-dashed">
            {team.map(
              (member) =>
                member.role === "Multi Media" && (
                  <MemberCard key={member.name} {...member} />
                )
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default about;
