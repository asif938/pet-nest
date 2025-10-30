import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import MakeAdmin from "../pages/admin/MakeAdmin";
import MyPets from "../pages/user/MyPets";
import ManageRequests from "../pages/user/ManageRequests";
import Pets from "../pages/user/Pets";
import PageNotFound from "../pages/PageNotFound";
// import { RouterProvider } from "react-router/dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/pets",
        element: <Pets></Pets>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      // admin routes
      {
        path: "makeadmin",
        element: <MakeAdmin></MakeAdmin>,
      },
      // user routes
      {
        path: "mypets",
        element: <MyPets></MyPets>,
      },
      {
        path: "managerequests",
        element: <ManageRequests></ManageRequests>,
      },
      {
        path: "pets",
        element: <Pets></Pets>,
      },
    ],
  },
]);