import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import style from "./BlankLayout.module.css"

export const BlankLayout = () => {

    return(
        <div className={style.page}>
            <Outlet />
        </div>
    );
}