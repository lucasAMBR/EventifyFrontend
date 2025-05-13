import { Outlet } from "react-router-dom"
import style from "./LoggedLayout.module.css"

export const LoggedLayout = () => {

    return(
        <div className={style.page}>
            <div className={style.sidebar}>
                <div className={style.navbar_content}>
                    <div className={style.navbar_header}>
                        <img src="/images/LogoWhite.png" alt="" />
                    </div>
                    <div className={[style.navbar_item, style.active].join(" ")}>
                        <div className={style.profile_pic}>

                        </div>
                        <div className={style.profile_desc}>
                            <h3>Nome do user</h3>
                            <p>View Profile</p>
                        </div>
                    </div>
                    <div className={style.navbar_item}>
                        Item
                    </div>
                </div>  
            </div>
            <Outlet />
        </div>
    )
}