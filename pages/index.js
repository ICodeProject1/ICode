import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import {
  FaHandshake,
  FaPeopleRoof,
  FaGift,
  FaPhotoFilm,
  FaChalkboardUser,
  FaCode,
} from "react-icons/fa6";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { faq } from "../utils/faq";
import FAQ from "../components/FAQ";
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
      type: "tween",
      duration: 1,
    },
  },
};

export default function Home() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <main>
      <section className="third-bg w-screen md:h-[70vh] flex justify-center items-center">
        <div className="w-4/5 flex flex-col md:flex-row  gap-20 my-10">
          <motion.div
            variants={upVariant}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
            className="md:w-1/2 items-center text-center md:text-left md:items-start flex flex-col justify-evenly"
          >
            <h1 className="font-bold text-4xl">
              Welcome To <br /> I-Code
            </h1>
            <p className="opacity-80 my-4">
              An online programming platform provides courses, tutorials, and
              exercises for learning programming languages. It offers a
              user-friendly interface and can provide personalized learning
              paths and certificates.
            </p>
            <button
              type="button"
              className="text-sm w-fit font-light px-6 py-3 bg-white text-black hover:text-white hover:bg-transparent border border-white transition-colors duration-300"
            >
              Get Started
            </button>
          </motion.div>
          <div className="md:w-1/2 animate-moveUpDown">
            <Image src="/home.png" alt="home" width={600} height={400} />
          </div>
        </div>
      </section>
      <section className="second-bg py-16 flex justify-center xl:h-[30rem]">
        <div className="w-4/5 flex flex-col lg:flex-row gap-16">
          <motion.div
            variants={upVariant}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:w-2/5 text-center lg:text-left"
          >
            <h1 className="text-4xl font-bold mb-12 mt-6">Sections</h1>
            <p className="mb-12 opacity-80">
              Our courses offer technical skills in web, game, and app
              development, plus soft skills in media, public relations, capacity
              building, HR, and organizational success for a well-rounded
              career.
            </p>
            <button
              type="button"
              className="text-sm w-fit font-light px-6 py-3 bg-white text-black hover:text-white hover:bg-transparent border border-white transition-colors duration-300"
            >
              Learn More
            </button>
          </motion.div>
          <motion.div
            variants={upVariant}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:w-3/5 grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-5"
          >
            <div className="p-8 rounded-[2rem] bg-[#17192f]">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl primary-bg">
                <FaHandshake className="w-5 h-4" />
              </div>
              <h5 className="my-4 text-[13px] font-bold">PR</h5>
              <p className="text-sm opacity-80">
                Communication strategy to enhance organization's reputation and
                relationships.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-[#17192f]">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#d63031]">
                <FaPeopleRoof className="w-5 h-4" />
              </div>
              <h5 className="my-4 text-[13px] font-bold">HR</h5>
              <p className="text-sm opacity-80">
                Managing personnel, recruitment, and development within an
                organization.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-[#17192f]">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#00b894]">
                <FaGift className="w-5 h-4" />
              </div>
              <h5 className="my-4 text-[13px] font-bold">OC</h5>
              <p className="text-sm opacity-80">
                Optimizing processes and resources to achieve organizational
                efficiency and effectiveness.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-[#17192f]">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#fdcb6e]">
                <FaPhotoFilm className="w-5 h-4" />
              </div>
              <h5 className="my-4 text-[13px] font-bold">Media</h5>
              <p className="text-sm opacity-80">
                Promoting products/services through various media channels to
                reach audiences.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-[#17192f]">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#d63031]">
                <FaChalkboardUser className="w-5 h-4" />
              </div>
              <h5 className="my-4 text-[13px] font-bold">CB</h5>
              <p className="text-sm opacity-80">
                Developing skills, knowledge, and resources to improve
                organizational performance.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-[#17192f]">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl primary-bg">
                <FaCode className="w-5 h-4" />
              </div>
              <h5 className="my-4 text-[13px] font-bold">Technical</h5>
              <p className="text-sm opacity-80">
                Applying specialized knowledge and skills to solve practical
                problems.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="third-bg pt-40 py-16 flex flex-col items-center">
        <motion.h1
          variants={upVariant}
          initial="hide"
          whileInView="show"
          viewport={{ once: true }}
          className="md:text-[40px] text-3xl text-center uppercase mb-10"
        >
          FREQUENTLY ASKED QUESTIONS
        </motion.h1>
        <motion.div
          variants={upVariant}
          initial="hide"
          whileInView="show"
          viewport={{ once: true }}
          className="w-4/5 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {faq.map((el) => (
            <FAQ {...el} key={el.title} />
          ))}
        </motion.div>
      </section>
      <section className="third-bg">
        <div className="container">
          <motion.h1
            variants={upVariant}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
            className="heading uppercase"
          >
            Who we are
          </motion.h1>
          <motion.div
            variants={upVariant}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={width < 768 ? "auto" : "2"}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: ".swiper-pagination", clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                clickable: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="swiper_container"
            >
              <SwiperSlide>
                <div className="w-20 h-20 m-auto bg-white rounded-full flex justify-center items-center mb-4">
                  <img
                    src="/AbdelrahmanEzzat.jpg"
                    alt="slide1"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <p className="text-sm text-center font-bold">
                  Abdelrahman Ezzat
                </p>
                <p className="text-xs opacity-80 text-center font-bold">
                  Founder & Supervisor
                </p>
                <p className="primary-bg p-8 text-center leading-8 mt-10">
                  I'm Abdelrahman, a student at the Faculty of Science,
                  Department of Chemistry, and I worked before that in
                  Organization Organization member at Empower , OC and HR member
                  at Circle for training and consultancy , PR member at 3ommar
                  Team , PR member at Space E , PR board at 3ommar , PR board at
                  Space E , Member at the Student union , President of ZeroOne
                  Team , Founder at 3ommarX and Supervisor i-Code
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-20 h-20 m-auto bg-white rounded-full flex justify-center items-center mb-4">
                  <img
                    src="/HamssMohsen.jpg"
                    alt="slide1"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <p className="text-sm text-center font-bold">Hamss Mohsen</p>
                <p className="text-xs opacity-80 text-center font-bold">
                  General Director
                </p>
                <p className="primary-bg p-8 text-center leading-8 mt-10">
                  I'm Hamss, a student at the Faculty of Science, Department of
                  Chemistry, and I worked before that in Organization
                  Organization member at Empower , OC and HR member at Circle
                  for training and consultancy , PR member at 3ommar Team , PR
                  member at Space E , PR board at 3ommar , PR board at Space E ,
                  Member at the Student union , President of ZeroOne Team , PR
                  Director at 3ommarX and General Director i-Code
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-20 h-20 m-auto bg-white rounded-full flex justify-center items-center mb-4">
                  <img
                    src="/Gohar.jpeg"
                    alt="slide1"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <p className="text-sm text-center font-bold">Gohar</p>
                <p className="text-xs opacity-80 text-center font-bold">
                  Project Manager
                </p>
                <p className="primary-bg p-8 text-center leading-8 mt-10">
                  I'm Gohar , a Computer Science student at the Faculty of
                  Science. I have experience as a member or leader in various
                  organizations, including Empower, Circle, 3ommar Team, Space
                  E, Student union, and 3ommarX, and as a Project Manager at
                  i-Code.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-20 h-20 m-auto bg-white rounded-full flex justify-center items-center mb-4">
                  <img
                    src="/MomenSaad.jpg"
                    alt="slide1"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <p className="text-sm text-center font-bold">Moamen Saad</p>
                <p className="text-xs opacity-80 text-center font-bold">
                  Project Manager
                </p>
                <p className="primary-bg p-8 text-center leading-8 mt-10">
                  I'm Moamen, a student at the Faculty of Science, Department of
                  Computer Science, and I worked before that in Organization
                  Organization member at Empower , OC and HR member at Circle
                  for training and consultancy , PR member at 3ommar Team , PR
                  member at Space E , PR board at 3ommar , PR board at Space E ,
                  Member at the Student union , President of ZeroOne Team , PR
                  Director at 3ommarX and Project manager i-Code
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-20 h-20 m-auto bg-white rounded-full flex justify-center items-center mb-4">
                  <img
                    src="/SomayaSaeed.jpg"
                    alt="slide1"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <p className="text-sm text-center font-bold">Somaya Saeed</p>
                <p className="text-xs opacity-80 text-center font-bold">
                  Project Manager
                </p>
                <p className="primary-bg p-8 text-center leading-8 mt-10">
                  I'm Somaya, a student at the Faculty of Science, Department of
                  Computer Science, and I worked before that in Organization
                  Organization member at Empower , OC and HR member at Circle
                  for training and consultancy , PR member at 3ommar Team , PR
                  member at Space E , PR board at 3ommar , PR board at Space E ,
                  Member at the Student union , President of ZeroOne Team , PR
                  Director at 3ommarX and Project manager i-Code
                </p>
              </SwiperSlide>
              <div className="slider-controler">
                <div className="swiper-button-prev slider-arrow">
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
                <div className="swiper-button-next slider-arrow">
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </Swiper>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
