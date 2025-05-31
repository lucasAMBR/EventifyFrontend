import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import api from "../../services/Api";
import style from "./Events.module.css";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AddEventModal } from "./components/AddEventModal";
import { EventCard } from "./components/EventCard";
import { UpdateEventModal } from "./components/UpdateEventModal";

export const Events = () => {

    const { loggedUser } = useUserContext();

    const [ userEventList, setUserEventList ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const [ addEventModalIsOpen, setAddEventModalIsOpen ] = useState(false);
    const [ updateEventModalIdOpen, setUpdateModalIsOpen ] = useState(false);
    const [ choosedEvent, setChoosedEvent] = useState(null);

    const [ hoverAddButton, setHoverAddButton ] = useState(false)

    const fetchUserEvents = async() => {
        setLoading(true);
        const response = await api.get(`/event/list/user/${loggedUser}`)
        setUserEventList(response.data);
        setLoading(false);
    }

    const handleOpenUpdateModal = (id) => {
        setChoosedEvent(id);
        setUpdateModalIsOpen(true);
    }

    useEffect(() => {
        fetchUserEvents();
    }, [])

    return(
        <div className={addEventModalIsOpen ? style.page_modal : style.page}>
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
                        {userEventList.length > 0 && !loading && 
                            <div className={style.event_list_area}>
                                <>
                                    {userEventList.map((item, index) => (
                                        <EventCard key={index} EventId={item.id} EventBanner={`http://localhost:8080${item.imagePath}`} EventTitle={item.title} EventDate={item.date} EventHour={item.hour} EventLocal={item.location} EventGuestLimit={item.guestLimit} EventHostName={item.organizerName} handleOpenModal={handleOpenUpdateModal}/>
                                    ))}
                                </>
                            </div>
                        }
                    </div>
                    {addEventModalIsOpen && <AddEventModal setEventModal={setAddEventModalIsOpen} fetchData={fetchUserEvents}/>}
                    {updateEventModalIdOpen && <UpdateEventModal EventId={choosedEvent} handleOpenModal={setUpdateModalIsOpen} />}
                </>  
            }
        </div>
    )
}