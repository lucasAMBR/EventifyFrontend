import { createBrowserRouter } from "react-router-dom";
import { BlankLayout } from "../layouts/BlankLayout";
import { Intro } from "../pages/intro/Intro";
import { Login } from "../pages/login/Login";
import { Feed } from "../pages/feed/Feed";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <BlankLayout />,
        children: [
            {
                path: "/",
                element: <Intro />
            },
            {
                path:"/login",
                element: <Login />
            },
            {
                path: "/feed",
                element: <Feed />
            }
        ]
    }
])

export default Router;