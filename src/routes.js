import Cart from "./pages/Cart";
import CategoryById from "./pages/CategoryById";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Signup from "./pages/Signup";

export const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/product/:pid",
        element: <Product />
    },
    {
        path: "/category/:documentId",
        element: <CategoryById />
    },
    {
        path: "/cart",
        element: <Cart />
    }
];