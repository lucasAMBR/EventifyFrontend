import { useState } from "react";
import style from "./Login.module.css";
import { DefaultRegister } from "./components/DefaultRegister";
import { LoginForm } from "./components/LoginForm";

export const Login = () => {
    const [section, setSection] = useState("login");

    return (
        <div className={style.login_area}>
            <div className={style.login_section}>
                <img src="/images/HorizontalLogo.png" />
                {section == "register" && <DefaultRegister />}
                {section == "login" && <LoginForm />}
                {section == "register" && (
                    <p className={style.minitext}>
                        Already have an account?{" "}
                        <span onClick={() => setSection("login")}>click here</span>
                    </p>
                )}
                {section == "login" && (
                    <p className={style.minitext}>
                        Doesn't have an account?{" "}
                        <span onClick={() => setSection("register")}>click here</span>
                    </p>
                )}
            </div>
        </div>
    );
};
