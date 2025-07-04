import { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "../Login.module.css";
import api from "../../../services/Api";
import { useUserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { ErrorMessage } from "./ErrorMessage";

export const LoginForm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Eventfy - Login";
    }, []);

    const { setLoggedUser, setUserRole } = useUserContext();

    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleReturnClick = () => {
        navigate("/");
    };

    const handleEmailChange = (event) => {
        setEmailInput(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPasswordInput(event.target.value);
    };

    const handleLoginAction = async (event) => {
        event.preventDefault();

        setLoading(true);

        const formData = new FormData();

        formData.append("email", emailInput);
        formData.append("password", passwordInput);

        try {
            const response = await api.post("/auth/login", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setLoggedUser(response.data.id);
            setUserRole(response.data.role);
            setLoading(false);
            navigate("/home");
        } catch (apiError) {
            console.log(apiError);
            setErrorMessage(apiError);
            setLoading(false);
        }
    };

    return (
        <div className={style.form}>
            <div className={style.return_button} onClick={handleReturnClick}>
                <ArrowBack className={style.arrow} sx={{ fill: "#FFFFFF" }} />
            </div>
            {errorMessage && <ErrorMessage message={errorMessage.message} />}
            <form className={style.login_form} onSubmit={handleLoginAction}>
                <label>Email</label>
                <input
                    type="text"
                    className={style.input}
                    placeholder="example@email.com"
                    value={emailInput}
                    onChange={handleEmailChange}
                />
                <label>Password</label>
                <input
                    type="password"
                    className={style.input}
                    placeholder="your password"
                    value={passwordInput}
                    onChange={handlePasswordChange}
                />
                <button type="submit" className={style.submit}>
                    Login
                </button>
                <p className={style.forgot}>
                    Forgot your password? <span>click here</span>
                </p>
            </form>
        </div>
    );
};
