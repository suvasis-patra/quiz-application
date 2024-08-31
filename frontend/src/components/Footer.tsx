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
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand and Description */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Quiz<span className="text-blue">Master</span>
          </h2>
          <p className="text-gray-400">
            Your ultimate platform for testing your knowledge. Join us and
            challenge yourself with quizzes from various categories!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:text-blue transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="hover:text-blue transition duration-300"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <MdEmail className="mr-3 text-xl text-blue" />
              <a
                href="mailto:support@quizmaster.com"
                className="hover:text-blue transition duration-300"
              >
                support@quizmaster.com
              </a>
            </li>
            <li className="flex items-center">
              <span className="text-lg">+1 (123) 456-7890</span>
            </li>
            <li>
              <address className="not-italic text-gray-400">
                123 Knowledge St, Quizville, QZ 12345
              </address>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 mb-4">Follow us on social media:</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            className="hover:text-blue transition duration-300"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://twitter.com"
            className="hover:text-blue transition duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            className="hover:text-blue transition duration-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            className="hover:text-blue transition duration-300"
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} QuizMaster. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
