import { useEffect, useState } from "react";
import style from "../Events.module.css"
import api from "../../../services/Api";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useUserContext } from "../../../contexts/UserContext";

export const UpdateEventModal = ({EventId, handleOpenModal, updateEvents}) => {

    const { loggedUser } = useUserContext();

    const [ loading, setLoading ] = useState(true);

    const [ currentEventData, setCurrentEventData ] = useState(null);
    const [ newEventTitle, setNewEventTitle ] = useState("");
    const [ newEventGuestLimit, setNewEventGuestLimit ] = useState("");
    const [ newEventLocation, setNewEventLocation ] = useState("");
    const [ newEventDescription, setNewEventDescription ] = useState("");
    const [ newEventLink, setNewEventLink ] = useState("");

    const fetchData = async() => {
        const response = await api.get(`event/find/${EventId}`);

        setCurrentEventData(response.data);
        setNewEventTitle(response.data.title);
        setNewEventGuestLimit(response.data.guestLimit);
        setNewEventLocation(response.data.location);
        setNewEventDescription(response.data.description);
        setNewEventLink(response.data.link)
        setLoading(false)
    }

    const handleTitleChange = (event) => {
        setNewEventTitle(event.target.value);
    }

    const handleGuestLimitChange = (event) => {
        setNewEventGuestLimit(event.target.value);
    }

    const handleLocationChange = (event) => {
        setNewEventLocation(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setNewEventDescription(event.target.value);
    }

    const handleLinkChange = (event) => {
        setNewEventLink(event.target.value)
    }

    const handleSubmitSuccess = () => {
        updateEvents();
        handleOpenModal(false);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("organizerId", loggedUser);
        formData.append("eventId", EventId);

        if(currentEventData.title != newEventTitle){
            formData.append("newTitle", newEventTitle);
        }

        if(currentEventData.guestLimit != newEventGuestLimit){
            formData.append("newGuestLimit",newEventGuestLimit);
        }else{
            formData.append("newGuestLimit", 0);
        }

        if(currentEventData.location != newEventLocation){
            formData.append("newLocation", newEventLocation);
        }

        if(currentEventData.description != newEventLocation){
            formData.append("newDescription", newEventDescription);
        }

        try{
            const response = await api.put("/event/update/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            handleSubmitSuccess();
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return(
        <div className={style.event_modal}>
            <div className={style.add_event}>
                <p className={style.close_add_event} onClick={() => handleOpenModal(false)}><ArrowBackIosIcon sx={{fill: "#004643"}}/> Close</p>
                <h1>Update event information</h1>
                <p>Here you can update the informations of your already created events, the guests will bem notified of this change</p>
                {loading &&
                    <p>Carregando...</p>
                }
                {currentEventData != null && currentEventData.type == "PRESENTIAL" && !loading && 
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p>Id</p>
                            <input type="text" className={style.normal_input} value={EventId} disabled/>
                            <p>Title</p>
                            <input type="text" className={style.normal_input} value={newEventTitle} onChange={handleTitleChange}/>
                            <p>Guest Limit</p>
                            <input type="text" className={style.normal_input} value={newEventGuestLimit} onChange={handleGuestLimitChange}/>
                            <p>Location</p>
                            <input type="text" className={style.normal_input} value={newEventLocation} onChange={handleLocationChange}/>
                            <p>Description</p>
                            <textarea name="" id="" value={newEventDescription} onChange={handleDescriptionChange}></textarea>
                        </div>
                        <button type="submit">Update</button>
                    </form>
                }
                {currentEventData != null && currentEventData.type == "ONLINE" && !loading &&
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p>Id</p>
                            <input type="text" className={style.normal_input} value={EventId} disabled/>
                            <p>Title</p>
                            <input type="text" className={style.normal_input} value={newEventTitle} onChange={handleTitleChange}/>
                            <p>Guest Limit</p>
                            <input type="text" className={style.normal_input} value={newEventGuestLimit} onChange={handleGuestLimitChange}/>
                            <p>Link</p>
                            <input type="text" className={style.normal_input} value={newEventLink} onChange={handleLinkChange}/>
                            <p>Description</p>
                            <textarea name="" id="" value={newEventDescription} onChange={handleDescriptionChange}></textarea>
                        </div>
                        <button type="submit">Update</button>
                    </form>
                }
            </div>
        </div>
    )
}