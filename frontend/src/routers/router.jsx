import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/dashboard/user/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDmain from "../pages/dashboard/admin/dashboard/AdminDmain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/categories/:categoryName', element: <CategoryPage /> },
            { path: '/search', element: <Search /> },
            { path: '/shop', element: <ShopPage /> },
            { path: '/shop/:id', element: <SingleProduct /> },
            { path: '/success', element: <PaymentSuccess /> },
            { path: '/order/:orderId', element: <OrderDetails /> },

        ],
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    // Dashboard routes
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            //User Routes
            { path: '', element: <UserDMain /> },
            { path: 'orders', element: <UserOrders /> },
            { path: 'profile', element: <UserProfile /> },

            // Admin Routes
            { path: 'admin', element: <PrivateRoute role="admin"><AdminDmain /></PrivateRoute> },
            { path: 'add-new-product', element: <PrivateRoute role="admin"><AddProduct /></PrivateRoute> },
            { path: 'manage-products', element: <PrivateRoute role="admin"><div>Manage Product</div></PrivateRoute> },
            { path: 'update-product/:id', element: <PrivateRoute role="admin"><div>Update Product</div></PrivateRoute > },
            { path: 'users', element: <PrivateRoute role="admin"><div>All Users</div> </PrivateRoute > },
            { path: 'manage-orders', element: <PrivateRoute role="admin"><div>Manage Orders</div></PrivateRoute > },
        ]
    }
]);


export default router