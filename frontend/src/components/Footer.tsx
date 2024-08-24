import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 md:px-12 lg:px-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Quiz<span className="text-blue">Master</span>
          </h2>
          <p className="text-gray-400 text-center md:text-left">
            Your ultimate platform for testing your knowledge. Join us and
            challenge yourself!
          </p>
        </div>

        <div className="flex flex-col md:flex-row mb-8 md:mb-0">
          <div className="flex flex-col items-center md:items-start md:mr-8">
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MdEmail className="mr-2 text-lg" />
                <a
                  href="mailto:support@quizmaster.com"
                  className="hover:text-blue"
                >
                  support@quizmaster.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-lg mr-2">+1 (123) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="hover:text-blue">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="hover:text-blue">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="hover:text-blue">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" className="hover:text-blue">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} QuizMaster. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
