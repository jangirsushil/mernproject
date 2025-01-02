import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { initializeAuth } from "./redux/AuthSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div className="app-container">
      <Toaster />
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
