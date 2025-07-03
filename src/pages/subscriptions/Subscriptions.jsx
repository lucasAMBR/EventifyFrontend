import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import api from "../../services/Api";
import style from "./Subscriptions.module.css";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { SubscriptionCard } from "./components/SubscriptionCard";
import { CancelSubsModal } from "./components/CancelSubsModal";
import { useNavigate } from "react-router-dom";

export const Subscriptions = () => {

    const { loggedUser } = useUserContext();
    const navigate = useNavigate();
    const [ userEventList, setUserEventList ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const [ addEventModalIsOpen, setAddEventModalIsOpen ] = useState(false);
    const [ cancelSubModalIsOpen, setCancelModalIsOpen ] = useState(false);
    const [ choosedEvent, setChoosedEvent] = useState(null);

    const [ hoverAddButton, setHoverAddButton ] = useState(false)

    const fetchUserEvents = async() => {
        setLoading(true);
        const response = await api.get(`/subscription/list/user/${loggedUser}`)
        setUserEventList(response.data);
        setLoading(false);
    }

    const handleOpenUpdateModal = (id) => {
        setChoosedEvent(id);
        setCancelModalIsOpen(true);
    }

    const closeModal = () => {
        setChoosedEvent(null);
        setCancelModalIsOpen(false);
    }

    useEffect(() => {
        fetchUserEvents();
    }, [])

    return(
        <div className={addEventModalIsOpen ? style.page_modal : style.page}>
            {loggedUser != null &&
                <>
                    <div className={style.page_header}>
                        <h1>My Subscriptions</h1>
                    </div>
                    <div className={style.page_content}>
                        {userEventList.length == 0 && loading && "loading..."}
                        {userEventList.length == 0 && !loading && 
                            <div className={style.no_events}>
                                <h2>You are not subscribed to any event...</h2>
                                <p>You can subscribe to events in the search page</p>
                                <button onClick={() => navigate("/home/search")}>Go to search page</button>
                            </div>
                        }
                        {userEventList.length > 0 && !loading && 
                            <div className={style.event_list_area}>
                                <>
                                    {userEventList.map((item, index) => (
                                        <SubscriptionCard setCancel={handleOpenUpdateModal} EventId={item.eventId} EventTitle={item.eventTitle} EventBanner={`http://localhost:8080${item.eventBannerPath}`} EventDate={item.date} EventHour={item.hour} status={item.status} />
                                    ))}
                                </>
                            </div>
                        }
                    </div>
                </>  
            }
            {cancelSubModalIsOpen && choosedEvent != null &&
                <CancelSubsModal closeModal={closeModal} id={choosedEvent} fetchEvents={fetchUserEvents}/>
            }
        </div>
    )
}