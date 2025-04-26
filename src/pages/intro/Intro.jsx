import { Navigate, useNavigate } from "react-router-dom";
import style from "./Intro.module.css";

export const Intro = () => {

    const navigate = useNavigate();

    return(
        <>
            <nav className={style.navbar}>
                <img src="/images/LogoWhite.png" />
                <div className={style.menu}>
                    <p>Search events</p>
                    <p>About us</p>
                    <p>User guide</p>
                </div>
                <div className={style.button} onClick={() => navigate("/login")}>Login</div>
            </nav>
        </>
    )
}