import { createBrowserRouter } from "react-router-dom";
import { BlankLayout } from "../layouts/BlankLayout";
import { Intro } from "../pages/intro/Intro";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <BlankLayout />,
        children: [
            {
                path: "/",
                element: <Intro />
            }
        ]
    }
])

export default Router;