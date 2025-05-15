import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import api from "../../services/Api";
import style from "./Events.module.css";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AddEventModal } from "./components/AddEventModal";

export const Events = () => {

    const { loggedUser } = useUserContext();

    const [ userEventList, setUserEventList ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const [ addEventModalIsOpen, setAddEventModalIsOpen ] = useState(false);

    const [ hoverAddButton, setHoverAddButton ] = useState(false)

    const fetchUserEvents = async() => {
        setLoading(true);
        const response = await api.get(`/event/list/user/${loggedUser}`)
        setUserEventList(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchUserEvents();
    }, [])

    return(
        <div className={style.page}>
            {loggedUser != null &&
                <>
                    <div className={style.page_header}>
                        <h1>My Events</h1>
                        <AddCircleIcon onClick={() => setAddEventModalIsOpen(true)} onMouseEnter={() => setHoverAddButton(true)} onMouseLeave={() => setHoverAddButton(false)} sx={hoverAddButton ? {width: "60px", height: "60px", fill: "#F9B663", cursor: "pointer"} : {width: "60px", height: "60px", fill: "#004643", cursor: "pointer"}}/>
                    </div>
                    <div className={style.page_content}>
                        {userEventList.length == 0 && loading && "loading..."}
                        {userEventList.length == 0 && !loading && 
                            <div className={style.no_events}>
                                <h2>Parece que voce não tem eventos cadastrados...</h2>
                                <button onClick={() => setAddEventModalIsOpen(true)}>Cadastrar novos eventos</button>
                            </div>
                        }
                        {userEventList.length > 0 && !loading && "Tem eventos"}
                    </div>
                    {addEventModalIsOpen && <AddEventModal />}
                </>  
            }
        </div>
    )
}