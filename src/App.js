import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Root from "./pages/Root";
import BookTable from "./pages/BookTable";
import Login, {action as loginAction} from "./pages/Login";
import Register, {action as registerAction} from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import { authFormMiddleware, checkToken } from "./utils/auth";
import Profile, {loader as profileLoader} from "./pages/Profile";
import {loader as logoutLoader} from './pages/Logout'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: ErrorPage,
    children: [
      {
        path: '',
        element: <Root/>,
        children: [
          {
            index: true,
            element: <Home/>
          },
          {
            path: 'menu',
            element: <Menu/>
          },
          {
            path: 'about',
            element: <About/>
          },
          {
            path: 'book-table',
            element: <BookTable/>
          },
          {
            path: '',
            loader: checkToken,
            children: [
              {
                path: 'profile',
                element: <Profile/>,
                loader: profileLoader
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

