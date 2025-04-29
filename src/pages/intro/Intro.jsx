import { Navigate, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from "react";

import style from "./Intro.module.css";

export const Intro = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        document.title = "Eventfy";
    },[])

    return(
        <>
            <nav className={style.navbar}>
                <img src="/images/LogoWhite.png" />
                <div className={style.menu}>
                    <p onClick={() => navigate("event-search")}>Search events</p>
                    <p>About us</p>
                    <p>User guide</p>
                </div>
                <div className={style.button} onClick={() => navigate("/login")}><LoginIcon sx={{fill: '#004643'}} className={style.button_icon}/>Login</div>
            </nav>
            <div className={style.mobile_search_event}>
                <SearchIcon sx={{fill: '#004643'}} className={style.search_icon}/>
            </div>
        </>
    )
}