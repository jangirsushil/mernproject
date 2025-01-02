import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../../redux/AuthSlice";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Navbar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const API_URL_V1 = import.meta.env.VITE_API_URL_V1;

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL_V1}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Logged out successfully.");
        dispatch(logout());
        setMenuOpen(false);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error(data.message || "Failed to log out.");
      }
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error("An error occurred while logging out.");
    }
  };

  const links = [
    { to: "/", label: "Home", show: true },
    { to: "/about", label: "About", show: true },
    { to: "/todo", label: "Todo", show: isLoggedIn },
    { to: "/login", label: "Login", show: !isLoggedIn },
  ];

  return (
    <nav>
      <div className="navbar-container">
        <h3>TodoApp</h3>

        <button className="logo" onClick={toggleMenu}>
          <GiHamburgerMenu className="bar" />
        </button>

        <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
          {links
            .filter((link) => link.show)
            .map((link, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  className="nav-link"
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          {isLoggedIn && (
            <li className="nav-item">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </nav>
  );
};

export default NavBar;
