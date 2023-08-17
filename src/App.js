import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home, {loader as discountLoader} from "./pages/Home";
import Menu, {loader as menuLoader} from "./pages/Menu";
import About from "./pages/About";
import Root from "./pages/Root";
import BookTable, {action as bookingAction} from "./pages/BookTable";
import Login, {action as loginAction} from "./pages/Login";
import Register, {action as registerAction} from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import { authFormMiddleware, checkToken } from "./utils/auth";
import Profile, {loader as profileLoader, action as updateProfileAction} from "./pages/Profile";
import {loader as logoutLoader} from './pages/Logout'
import Order, {loader as orderLoader} from "./pages/Order";

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '',
        element: <Root/>,
        children: [
          {
            index: true,
            element: <Home/>,
            loader: discountLoader
          },
          {
            path: 'menu',
            element: <Menu/>,
            loader: menuLoader
          },
          {
            path: 'about',
            element: <About/>
          },
          {
            path: 'book-table',
            element: <BookTable/>,
            action: bookingAction
          },
          {
            path: '',
            loader: checkToken,
            children: [
              {
                path: 'profile',
                element: <Profile/>,
                loader: profileLoader,
                action: updateProfileAction
              },
              {
                path: 'order',
                element: <Order/>,
                loader: orderLoader
              }
            ]
          },
        ]
      },
      {
        path: 'login',
        element: <Login/>,
        action: loginAction,
        loader: authFormMiddleware
      },
      {
        path: 'register',
        element: <Register/>,
        action: registerAction,
        loader: authFormMiddleware

      },
      {
        path: 'logout',
        loader: logoutLoader
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router}/>;
};

export default App;

