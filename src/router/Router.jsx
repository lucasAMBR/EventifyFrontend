import { createBrowserRouter } from "react-router-dom";
import { BlankLayout } from "../layouts/BlankLayout";
import { Intro } from "../pages/intro/Intro";
import { Login } from "../pages/login/Login";
import { Feed } from "../pages/feed/Feed";
import { EventSearch } from "../pages/eventSearch/EventSearch";
import { EventDetails } from "../pages/EventDetails/EventDetails";
import { LoggedLayout } from "../layouts/LoggedLayout";
import { Subscriptions } from "../pages/subscriptions/Subscriptions";
import { Search } from "../pages/search/Search";
import { Profile } from "../pages/profile/Profile";
import { Events } from "../pages/OrganizerEvents/Events";
import { MyProfile } from "../pages/my_profile/My_profile";
import { EventFeed } from "../pages/event_feed/EventFeed";
import { Confirmation } from "../pages/confirmation/Confirmation";

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
                path: "/confirmation",
                element: <Confirmation />
            },
            {
                path: "/event-search",
                element: <EventSearch />
            },
            {
                path: "/event-search/details/:id",
                element: <EventDetails />
            }
        ]
    },
    {
        path: "/home",
        element: <LoggedLayout />,
        children: [
            {
                path: "/home",
                element: <Feed />
            },
            {
                path: "/home/event/:id",
                element: <EventFeed />
            },
            {
                path: "/home/subscriptions",
                element: <Subscriptions />
            },
            {
                path: "/home/search",
                element: <Search />
            },
            {
                path: "/home/user/profile/:id",
                element: <Profile />
            },
            {
                path: "/home/user/profile/me",
                element: <MyProfile />
            },
            {
                path: "/home/my_events",
                element: <Events />
            }
        ]
    }
])

export default Router;