import { useEffect, useState } from "react";
import style from "./Confirmation.module.css";
import { DefaultRegister } from "./components/DefaultRegister";
import { LoginForm } from "./components/LoginForm";

export const Confirmation = () => {
    // === STATES ===
    const [section, setSection] = useState("login");
    const [coordenadas, setCoordenadas] = useState({ latitude: null, longitude: null });
    const [errorMessage, setErrorMessage] = useState(null);

    // === EFFECTS ===
    useEffect(() => {
        if (!navigator.geolocation) {
            setErrorMessage("Geolocalização não é suportada neste navegador.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordenadas({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setErrorMessage("Permissão de localização negada.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setErrorMessage("Localização indisponível.");
                        break;
                    case error.TIMEOUT:
                        setErrorMessage("Tempo de solicitação expirado.");
                        break;
                    default:
                        setErrorMessage("Erro desconhecido ao obter localização.");
                }
            }
        );
    }, []);

    // === RETURN ===
    return (
        <div className={style.login_area}>
            <div className={style.login_section}>
                <img src="/images/HorizontalLogo.png" />
                {errorMessage && <p>{errorMessage}</p>}
                <LoginForm coordenadas={coordenadas} />
                {section == "register" && (
                    <p style={{ opacity: 0.0 }} className={style.minitext}>
                        Already have an account? <span onClick={() => setSection("login")}>click here</span>
                    </p>
                )}
                {section == "login" && (
                    <p style={{ opacity: 0.0 }} className={style.minitext}>
                        Doesn't have an account? <span onClick={() => setSection("register")}>click here</span>
                    </p>
                )}
            </div>
        </div>
    );
};
