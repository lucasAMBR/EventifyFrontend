import { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import style from "../Confirmation.module.css";
import api from "../../../services/Api";
import { useUserContext } from "../../../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

export const LoginForm = ({ coordenadas }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const code = queryParams.get("code");
    const type = queryParams.get("type");

    const navigate = useNavigate();

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

        if (type == "ONLINE") {
            const formData = new FormData();
            formData.append("email", emailInput);
            formData.append("password", passwordInput);

            try {
                const response = await api.put(`/confirmation/confirm/online/${code}`, formData, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                });

                if (response.status == 204) {
                    console.log("presença confirmada");
                }
            } catch (apiError) {
                console.log(apiError);
                setErrorMessage(apiError);
                setLoading(false);
            }
        }

        if (type == "PRESENTIAL") {
            const formData = new FormData();
            formData.append("email", emailInput);
            formData.append("password", passwordInput);
            formData.append("latitude", coordenadas.latitude);
            formData.append("longitude", coordenadas.longitude);

            console.log(formData.get("latitude"));
            console.log(formData.get("longitude"));

            try {
                const response = await api.put(`/confirmation/confirm/${code}`, formData, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                });

                if (response.status == 204) {
                    console.log("presença confirmada");
                }
            } catch (apiError) {
                console.log(apiError);
                setErrorMessage(apiError);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        document.title = "Eventfy - Login";
    }, []);

    return (
        <div className={style.form}>
            <div className={style.return_button} onClick={handleReturnClick}>
                <ArrowBack className={style.arrow} sx={{ fill: "#FFFFFF" }} />
            </div>
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
                <button type="submit" className={style.submit}>Confirm Presence</button>
                <p className={style.forgot}>Forgot your password? <span>click here</span></p>
            </form>
        </div>
    );
};
