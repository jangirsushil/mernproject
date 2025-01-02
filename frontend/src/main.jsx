import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePages from "./pages/HomePages.jsx";
import About from "./pages/About.jsx";
import Todo from "./pages/Todo.jsx";
import Login from "./pages/Login.jsx";
import { store } from "../src/redux/Store.js";
import { Provider } from "react-redux";

import Error from "./pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePages />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <Error />,
      },
      {
        path: "/todo",
        element: <Todo />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
