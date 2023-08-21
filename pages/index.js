import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
            <Link href="/auth/login">
              <button
                type="button"
                className="text-sm w-fit font-light px-6 py-3 bg-white text-black hover:text-white hover:bg-transparent border border-white transition-colors duration-300"
              >
                Get Started
              </button>
            </Link>
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
                  I'm Abdelrahman Ezzat Third Year Student At Chemistry
                  Department at Faculty Of Science Alexandria University Looking
                  For All Ways To Make a better Community and I Can Say That My
                  Achievements are - Business Office Manager at ESDF - Public &
                  International Relations Specialist at Remooz.events - Founder
                  & Director at Whisper Team - Founder & Director at Zero One -
                  Project Manager (PM) at SpaceE - Human Resources &
                  Organization Member at Circle for Training & Consultancy -
                  Founder & Director at 3ommar X Event - Founder at 3ommar
                  Projects Community - Head Of Entities at Faculty of science
                  Student Union - Former Presenter & Script writer at Enactus
                  Alexandria University - Head of Human Resources Department at
                  Hult Prize At Alexandria - Human Resources Manager (HR
                  Specialist) at GMind - Manager & Director at 3ommar Team -
                  Former Organisation member at Empower Hub - Former Participant
                  at Mind Utopia - SMU
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
                  I’m Hamss Mohsen, A graduate of Faculty of Science. I’m vice
                  president of 3ommar team I was head of public relations in
                  3ommar team and capstone project. I was a volunteer in Resala
                  charity organization and member of project management at
                  enactus alexandria.
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
                  I'm Gohar, a student in the College of Science, majoring in
                  Computer Science. I have various roles: I work as a member of
                  an organization called Empower, where I contribute to its
                  activities. Additionally, I hold positions as an OC and HR
                  member at Circle, which focuses on training and consultancy. I
                  am also involved as a PR member for both the 3ommar Team and
                  Space E, and I serve on their respective PR boards. In
                  addition, I am a member of the Student Union, representing the
                  interests of fellow students. I have the privilege of being
                  the President of the ZeroOne Team, and I also serve as the PR
                  Director at 3ommarX. Moreover, I am currently a trainee at
                  iCareer and work as a Project Manager at I-Code.
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
                  I am Moamen Saad, a student in the College of Science,
                  Department of Computer Science. I have been working as a
                  social media specialist for four years, helping various
                  organizations with their online presence. I also run my own
                  online marketing agency called MS Marketing. Additionally, I
                  am involved in several organizations in different roles. I am
                  a member of Empower Hub, Orgnaizer and Human Resources At
                  Circle for training and consultancy. I serve as a Public
                  Relation member for 3ommar Team and Space E. I am part of the
                  Human Resources board for 3ommar and Space E. Moreover, I hold
                  the position of Head of the cultural and media committee at
                  the Faculty of Science Alexandria University. Besides, I am
                  honored to be the Vice President of ZeroOne Team and the Human
                  Resources Director at 3ommarX. I have also gained experience
                  as a trainee at iCareer and I am currently working as a
                  project manager at I-Code.
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
                  I am Somaya, a college student studying computer science at
                  the College of Science. In addition to my studies, I hold
                  several positions such as General Director at 3ommarX Event ,
                  Head of PR at Space E project, 3ommar Team, and MEU project.
                  Moreover, I am a Project Manager at I-Code.
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
