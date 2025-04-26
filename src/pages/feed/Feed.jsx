import { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom";

export const Feed = () => {

    const navigate = useNavigate();

    const { loggedUser } = useUserContext();

    useEffect(()=>{
        if(loggedUser == null){
            navigate("/login")
        }
    })

    return(
        <p>
            {loggedUser != null && `
                ${loggedUser}
            `}
        </p>
    )
}