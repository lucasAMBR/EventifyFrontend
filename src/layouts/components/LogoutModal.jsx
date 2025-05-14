import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import style from "../LoggedLayout.module.css";

export const LogoutModal = () => {

    const navigate = useNavigate();

    const { setLoggedUser } = useUserContext();

    const handleBackToLogin = () => {
        navigate("/login")
    }

    return(
        <div className={style.logout_modal_area}>
            <div className={style.logout_modal}>
                <h2>No user logged in</h2>
                <p>Please log in again</p>
                <button onClick={handleBackToLogin}>OK</button>
            </div>
        </div>
    )
}