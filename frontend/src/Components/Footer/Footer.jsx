// Footer.js

import "./Footer.css"; // Separate CSS file for footer styling
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Social media icons from react-icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-social">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={24} />
        </a>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 TodoApp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
