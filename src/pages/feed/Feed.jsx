import { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom";

export const Feed = () => {

    const navigate = useNavigate();

    const { loggedUser } = useUserContext();

    useEffect(() => {
        document.title = "Eventfy - Home"
    }, [])

    return(
        <p>
            {loggedUser != null && `
                feed
            `}
        </p>
    )
}