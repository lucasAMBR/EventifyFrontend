import { Outlet, useNavigate } from "react-router-dom"
import style from "./LoggedLayout.module.css"
import { DateRange, Home, Logout, Search } from "@mui/icons-material"
import { useUserContext } from "../contexts/UserContext"
import { useEffect, useState } from "react"
import { LogoutModal } from "./components/LogoutModal"
import api from "../services/Api"

export const LoggedLayout = () => {

    const navigate = useNavigate();

    const [ manualLogout, setManualLogout ] = useState(false);

    const [ userData, setUserData ] = useState(null);

    const { loggedUser, setLoggedUser } = useUserContext();

    const handleLogout = () => {
        setManualLogout(true)
        setLoggedUser(null);
        navigate("/login");
    }

    const fetchUserData = async() => {
        const response = await api.get(`/user/profile/${loggedUser.id}`);

        setUserData(response.data)
    }

    useEffect(() => {
        if(loggedUser != null){
            fetchUserData();
        }
    }, [])

    return(
        <div className={style.page}>
            <div className={style.sidebar}>
                <div className={style.navbar_content}>
                    <div className={style.navbar_header}>
                        <img src="/images/LogoWhite.png" alt="" />
                    </div>
                    {userData != null ?
                        <div className={style.navbar_item}>
                            <div className={style.profile_pic}>
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
                    <div className={style.navbar_item}>
                        <div className={style.section_icon}>
                            <Home sx={{width: "40px", height: "40px", fill: "#004643"}}/>
                        </div>
                        <div className={style.profile_desc}>
                            <p>Home</p>
                        </div>
                    </div>
                    <div className={style.navbar_item}>
                        <div className={style.section_icon}>
                            <Search sx={{width: "40px", height: "40px", fill: "#004643"}}/>
                        </div>
                        <div className={style.profile_desc}>
                            <p>Search</p>
                        </div>
                    </div>
                    <div className={style.navbar_item}>
                        <div className={style.section_icon}>
                            <DateRange sx={{width: "40px", height: "40px", fill: "#004643"}}/>
                        </div>
                        <div className={style.profile_desc}>
                            <p>Subscriptions</p>
                        </div>
                    </div>
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
            {loggedUser == null && !manualLogout && <LogoutModal />}
            <Outlet />
        </div>
    )
}