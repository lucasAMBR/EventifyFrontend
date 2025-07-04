import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import api from "../../services/Api";
import style from "./Events.module.css";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AddEventModal } from "./components/AddEventModal";
import { EventCard } from "./components/EventCard";
import { UpdateEventModal } from "./components/UpdateEventModal";
import { CancelEventModal } from "./components/CancelEventModal";
import { GenerateConfirmationCodeModal } from "./components/GenerateConfirmationCodeModal";

export const Events = () => {
    const { loggedUser } = useUserContext();

    const [userEventList, setUserEventList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [addEventModalIsOpen, setAddEventModalIsOpen] = useState(false);
    const [updateEventModalIdOpen, setUpdateModalIsOpen] = useState(false);
    const [cancelEventModalIsOpen, setCancelEventModalIsOpen] = useState(false);
    const [choosedEvent, setChoosedEvent] = useState(null);

    const [
        generateConfirmationCodeModalIsOpen,
        setGenerateConfirmationCodeModalIsOpen,
    ] = useState(false);
    const [choosedEventId, setChoosedEventId] = useState(null);
    const [choosedEventType, setChoosedEventType] = useState(null);

    const handleOpenGenerateConfirmationCodeModal = (id, type) => {
        setChoosedEventId(id);
        setChoosedEventType(type);
        setGenerateConfirmationCodeModalIsOpen(true);
    };

    const [hoverAddButton, setHoverAddButton] = useState(false);

    const fetchUserEvents = async () => {
        setLoading(true);
        const response = await api.get(`/event/list/user/${loggedUser}`);
        setUserEventList(response.data);
        setLoading(false);
    };

    const handleOpenUpdateModal = (id) => {
        setChoosedEvent(id);
        setUpdateModalIsOpen(true);
    };

    const handleOpenCancelEventModal = (id) => {
        setChoosedEvent(id);
        setCancelEventModalIsOpen(true);
    };

    const handleCloseCancelEventModal = () => {
        setChoosedEvent(null);
        setCancelEventModalIsOpen(false);
    };

    useEffect(() => {
        fetchUserEvents();
    }, []);

    return (
        <div className={addEventModalIsOpen ? style.page_modal : style.page}>
            {loggedUser != null && (
                <>
                    <div className={style.page_header}>
                        <h1 onClick={() => console.log(userEventList)}>My Events</h1>
                        <AddCircleIcon
                            onClick={() => setAddEventModalIsOpen(true)}
                            onMouseEnter={() => setHoverAddButton(true)}
                            onMouseLeave={() => setHoverAddButton(false)}
                            sx={
                                hoverAddButton
                                    ? {
                                        width: "60px",
                                        height: "60px",
                                        fill: "#F9B663",
                                        cursor: "pointer",
                                    }
                                    : {
                                        width: "60px",
                                        height: "60px",
                                        fill: "#004643",
                                        cursor: "pointer",
                                    }
                            }
                        />
                    </div>
                    <div className={style.page_content} onClick={() => console.log(userEventList)}>
                        {userEventList.filter((event) => (event.active == true) || (event.active == false && event.subscriptionList.length > 0)).length ==
                            0 &&
                            loading &&
                            "loading..."}
                        {userEventList.filter((event) => (event.active == true) || (event.active == false && event.subscriptionList.length > 0)).length ==
                            0 &&
                            !loading && (
                                <div className={style.no_events}>
                                    <h2>Parece que voce não tem eventos ativos cadastrados...</h2>
                                    <button onClick={() => setAddEventModalIsOpen(true)}>
                                        Cadastrar novos eventos
                                    </button>
                                </div>
                            )}
                        {userEventList.filter((event) => (event.active == true) || (event.active == false && event.subscriptionList.length > 0)).length > 0 &&
                            !loading && (
                                <div className={style.event_list_area}>
                                    <>
                                        {userEventList
                                            .filter((event) => (event.active == true) || (event.active == false && event.subscriptionList.length > 0))
                                            .slice()
                                            .map((item, index) => (
                                                <EventCard
                                                    openCancelModal={handleOpenCancelEventModal}
                                                    openGenerateConfirmationCodeModal={
                                                        handleOpenGenerateConfirmationCodeModal
                                                    }
                                                    key={index}
                                                    EventId={item.id}
                                                    EventLink={item.link}
                                                    EventType={item.type}
                                                    EventActive={item.active}
                                                    EventBanner={`http://localhost:8080${item.imagePath}`}
                                                    EventTitle={item.title}
                                                    EventDate={item.date}
                                                    EventHour={item.hour}
                                                    EventLocal={item.location}
                                                    EventGuestLimit={item.guestLimit}
                                                    EventHostName={item.organizerName}
                                                    handleOpenModal={handleOpenUpdateModal}
                                                />
                                            ))}
                                    </>
                                </div>
                            )}
                    </div>
                    {addEventModalIsOpen && (
                        <AddEventModal
                            setEventModal={setAddEventModalIsOpen}
                            fetchData={fetchUserEvents}
                        />
                    )}
                    {updateEventModalIdOpen && (
                        <UpdateEventModal
                            EventId={choosedEvent}
                            handleOpenModal={setUpdateModalIsOpen}
                            updateEvents={fetchUserEvents}
                        />
                    )}
                    {cancelEventModalIsOpen && choosedEvent != null && (
                        <CancelEventModal
                            id={choosedEvent}
                            closeModal={handleCloseCancelEventModal}
                            fetchEvents={fetchUserEvents}
                        />
                    )}
                    {generateConfirmationCodeModalIsOpen && choosedEventId != null && (
                        <GenerateConfirmationCodeModal
                            eventId={choosedEventId}
                            eventType={choosedEventType}
                            setGenerateConfirmationCodeModalIsOpen={
                                setGenerateConfirmationCodeModalIsOpen
                            }
                        />
                    )}
                </>
            )}
        </div>
    );
};
