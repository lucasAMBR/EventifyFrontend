import { Outlet, useLocation, useNavigate } from "react-router-dom"
import style from "./LoggedLayout.module.css"
import { DateRange, Home, Logout, Search } from "@mui/icons-material"
import { useUserContext } from "../contexts/UserContext"
import { useEffect, useState } from "react"
import { LogoutModal } from "./components/LogoutModal"
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import api from "../services/Api"

export const LoggedLayout = () => {

    const navigate = useNavigate();
    const location = useLocation()

    const [ manualLogout, setManualLogout ] = useState(false);

    const [ mobileMenuIsOpen, setMobileMenuIsOpen ] = useState(false);

    const [ userData, setUserData ] = useState(null);

    const { loggedUser, setLoggedUser, userRole, setUserRole } = useUserContext();

    const handleLogout = () => {
        setManualLogout(true)
        setLoggedUser(null);
        navigate("/login");
    }

    const fetchUserData = async() => {
        const response = await api.get(`/user/profile/${loggedUser}`);

        setUserData(response.data);
    }

    const handleMobileSectionSwitch = (path) => {
        navigate(path);
        setMobileMenuIsOpen(!mobileMenuIsOpen);
    }

    useEffect(() => {
        if(loggedUser != null){
            fetchUserData();
        }
    }, [])

    return(
        <div className={style.page}>
            {userData != null &&
            <>
            <div className={style.sidebar}>
                <div className={style.navbar_content}>
                    <div className={style.navbar_header}>
                        <img src="/images/LogoWhite.png" alt="" />
                    </div>
                    {userData != null ?
                        <div className={location.pathname == `/home/me` ? [style.navbar_item, style.active].join(" ") : style.navbar_item} onClick={() => navigate(`/home/me`)}>
                            <div className={style.profile_pic}>
                                <img src={`http://localhost:8080${userData.profilePicPath}`} />
                            </div>
                            <div className={style.profile_desc}>
                                <h3>{userData.name}</h3>
                                <p>View Profile</p>
                            </div>
                        </div>
                        :
                        <div className={style.navbar_item}>
                            <div className={style.profile_pic}>
                            </div>
                            <div className={style.profile_desc}>
                                <h3>Nome do user</h3>
                                <p>View Profile</p>
                            </div>
                        </div>
                    }   
                    <div className={location.pathname == `/home` ? [style.navbar_item, style.active].join(" ") : style.navbar_item} onClick={() => navigate("/home")}>
                        <div className={style.section_icon}>
                            <Home sx={{width: "40px", height: "40px", fill: "#004643"}}/>
                        </div>
                        <div className={style.profile_desc}>
                            <p>Home</p>
                        </div>
                    </div>
                    <div className={location.pathname == `/home/search` ? [style.navbar_item, style.active].join(" ") : style.navbar_item} onClick={() => navigate("/home/search")}>
                        <div className={style.section_icon}>
                            <Search sx={{width: "40px", height: "40px", fill: "#004643"}}/>
                        </div>
                        <div className={style.profile_desc}>
                            <p>Search</p>
                        </div>
                    </div>
                    {userRole == "DEFAULT" &&
                    <div className={location.pathname == `/home/subscriptions` ? [style.navbar_item, style.active].join(" ") : style.navbar_item} onClick={() => navigate("/home/subscriptions")}>
                        <div className={style.section_icon}>
                            <DateRange sx={{width: "40px", height: "40px", fill: "#004643"}} />
                        </div>
                        <div className={style.profile_desc}>
                            <p>Subscriptions</p>
                        </div>
                    </div>
                    }
                    {userRole == "ORGANIZER" &&
                    <div className={location.pathname == `/home/my_events` ? [style.navbar_item, style.active].join(" ") : style.navbar_item} onClick={() => navigate("/home/my_events")}>
                        <div className={style.section_icon}>
                            <DateRange sx={{width: "40px", height: "40px", fill: "#004643"}} />
                        </div>
                        <div className={style.profile_desc}>
                            <p>Your Events</p>
                        </div>
                    </div>
                    }
                </div>  
                <div className={[style.navbar_item, style.logout].join(" ")} onClick={handleLogout}>
                    <div className={style.section_icon}>
                        <Logout sx={{width: "40px", height: "40px", fill: "#004643"}}/>
                    </div>
                    <div className={style.profile_desc}>
                        <p>Logout</p>
                    </div>
                </div>
            </div>
            <div className={style.mobile_navbar}>
                <img src="/images/LogoWhite.png" alt="" />
                <div className={style.mobile_wrapper}>
                    <div className={location.pathname == "/home/me" ? [style.mobile_profile_button, style.mobile_profile_button_active].join(" ") : style.mobile_profile_button} onClick={() => navigate("/home/me")}>
                        <img src={`http://localhost:8080${userData.profilePicPath}`} />
                    </div>
                    <div className={mobileMenuIsOpen ? [style.menu_box, style.menu_box_active].join(" ") : style.menu_box} onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}>
                        <MenuIcon sx={mobileMenuIsOpen ? {fill: "#004643"} : {fill: "#ffffff"}}/>
                    </div>
                </div>
                {mobileMenuIsOpen &&
                    <div className={style.menu_area}>
                        <div className={style.mobile_sidebar}>
                            <div>
                                <div className={style.mobile_sidebar_header}>
                                    <p onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}><ArrowBackIosIcon sx={{fill: "#ffffff"}}/> Close</p>
                                </div>
                                <div className={location.pathname == "/home" ? [style.mobile_sidebar_item, style.mobile_sidebar_item_active].join(" ") : style.mobile_sidebar_item} onClick={() => handleMobileSectionSwitch("/home")}>
                                    <Home sx={{fill: "#ffffff"}}/> Home
                                </div>
                                <div className={location.pathname == "/home/search" ? [style.mobile_sidebar_item, style.mobile_sidebar_item_active].join(" ") : style.mobile_sidebar_item} onClick={() => handleMobileSectionSwitch("/home/search")}>
                                    <Search sx={{fill: "#ffffff"}}/> Search
                                </div>
                                {userRole == "DEFAULT" &&
                                    <div className={location.pathname == "/home/subscriptions" ? [style.mobile_sidebar_item, style.mobile_sidebar_item_active].join(" ") : style.mobile_sidebar_item} onClick={() => handleMobileSectionSwitch("/home/subscriptions")}>
                                        <DateRange sx={{fill: "#ffffff"}}/> Subscriptions
                                    </div>
                                }
                                {userRole == "ORGANIZER" &&
                                    <div className={location.pathname == "/home/my_events" ? [style.mobile_sidebar_item, style.mobile_sidebar_item_active].join(" ") : style.mobile_sidebar_item} onClick={() => handleMobileSectionSwitch("/home/my_events")}>
                                        <DateRange sx={{fill: "#ffffff"}}/> Your Events
                                    </div>
                                }
                                <div className={style.mobile_sidebar_item}>
                                    <Logout sx={{fill: "#ffffff"}}/> Logout
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            </>
            }
            {loggedUser == null && !manualLogout && <LogoutModal />}
            <Outlet />
        </div>
    )
}