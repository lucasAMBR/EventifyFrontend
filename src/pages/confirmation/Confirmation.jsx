import { useEffect, useState } from "react";
import style from "./Confirmation.module.css"
import { DefaultRegister } from "./components/DefaultRegister";
import { LoginForm } from "./components/LoginForm";

export const Confirmation = () => {

    const [ section, setSection ] = useState("login");

    const [coordenadas, setCoordenadas] = useState({ latitude: null, longitude: null });
    const [erro, setErro] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
          setErro("Geolocalização não é suportada neste navegador.");
          return;
        }
    
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordenadas({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setErro("Permissão de localização negada.");
                break;
              case error.POSITION_UNAVAILABLE:
                setErro("Localização indisponível.");
                break;
              case error.TIMEOUT:
                setErro("Tempo de solicitação expirado.");
                break;
              default:
                setErro("Erro desconhecido ao obter localização.");
            }
          }
        );
      }, []);

    return(
        <div className={style.login_area}>
            <div className={style.login_section}>
                <img src="/images/HorizontalLogo.png" />
                {erro && <p>{erro}</p>}
                <LoginForm coordenadas={coordenadas} />
                {section == "register" &&
                    <p style={{opacity: 0.0}} className={style.minitext}>Already have an account? <span onClick={() => setSection("login")}>click here</span></p>
                }
                {section == "login" &&
                    <p style={{opacity: 0.0}} className={style.minitext}>Doesn't have an account? <span onClick={() => setSection("register")}>click here</span></p>
                }
            </div>
        </div>
    );
}