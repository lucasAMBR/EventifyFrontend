import style from "./Intro.module.css";

export const Intro = () => {

    return(
        <>
            <nav className={style.navbar}>
                <img src="/images/LogoWhite.png" />
                <div className={style.menu}>
                    <p>Search events</p>
                    <p>About us</p>
                    <p>User Guide</p>
                </div>
                <div className={style.button}>Login</div>
            </nav>  
        </>
    )
}