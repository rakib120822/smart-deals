import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../components/Home/Home";
import AllProducts from "../components/AllProducts/AllProducts";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import PrivateRoute from "../components/private routes/PrivateRoute";
import MyProducts from "../components/MyProducts/MyProducts";
import MyBids from "../components/My bids/MyBids";
import ProductsDetails from "../components/ProductsDetails/ProductsDetails";
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
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/product-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`).then((res) =>
            res.json()
          ),
        element: <ProductsDetails />,
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
