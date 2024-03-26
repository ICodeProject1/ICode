import React from "react";
import Link from "next/link";
import { FaFacebook, FaWhatsapp, FaEnvelopesBulk } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="second-bg p-8 footer-shadow">
      <div className="w-full grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 m-6 shadow-md pb-6">
        <div className="my-4 sm:my-0 text-center sm:text-left">
          <Link href="/">
            <h4 className="text-xl font-bold mb-4">I-Code</h4>
          </Link>
          <p className="text-sm">
            I-Code is a Non Profit Project Presented By 3ommar Team about
            Programming and Soft Skills
          </p>
        </div>
        <div className="my-4 sm:my-0 text-center sm:text-left">
          <h4 className="text-xl font-bold mb-4">Permalinks</h4>
          <ul>
            <Link href="/">
              <li className="text-sm mb-3 hover:underline">Home</li>
            </Link>
            <Link href="/about">
              <li className="text-sm mb-3 hover:underline">About</li>
            </Link>
            <Link href="/contact">
              <li className="text-sm mb-3 hover:underline">Contact</li>
            </Link>
          </ul>
        </div>
        <div className="my-4 sm:my-0 text-center sm:text-left">
          <h4 className="text-xl font-bold mb-4">Privacy</h4>
          <ul>
            <Link href="/">
              <li className="text-sm mb-3 hover:underline">Privacy Policy</li>
            </Link>
            <Link href="/">
              <li className="text-sm mb-3 hover:underline">
                Terms and conditions
              </li>
            </Link>
            <Link href="/">
              <li className="text-sm mb-3 hover:underline">Refund Policy</li>
            </Link>
          </ul>
        </div>
        <div className="my-4 sm:my-0 text-center sm:text-left">
          <h4 className="text-xl font-bold mb-4">Contact Us</h4>
          <a href="tel:+201223728219">
            <p className="text-sm">01223728219</p>
          </a>
          <p className="text-sm mb-8">icodeproject01@gmail.com</p>
          <div className="flex">
            <a
              href="https://www.facebook.com/icodeproject"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl mx-2" />
            </a>
            <a
              href="https://wa.me/+201223728219"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-2xl mx-2" />
            </a>
            <a
              href="mailto:icodeproject01@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelopesBulk className="text-2xl mx-2" />
            </a>
          </div>
        </div>
      </div>
      <div>
        <p className="text-center">
          I-Code &copy; 2023, Made by{" "}
          <span className="text-[#6d28d9]">
            <a
              href="https://devlab-tech.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              DevLab
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
