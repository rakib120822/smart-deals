import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Layouts/Root.jsx";
import Home from "./components/Home/Home.jsx";
import AllProducts from "./components/AllProducts/AllProducts.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Register from "./components/Auth/Register.jsx";
import Login from "./components/Auth/Login.jsx";
import MyProducts from "./components/MyProducts/MyProducts.jsx";
import MyBids from "./components/My bids/MyBids.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allproducts",
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "my-products",
        element: <MyProducts />,
      },
      {
        path: "/my-bids",
        element: <MyBids />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
