import { use, useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import style from "../Events.module.css";
import { useUserContext } from "../../../contexts/UserContext";
import api from "../../../services/Api";

export const AddEventModal = ({ setEventModal, fetchData }) => {

    const { loggedUser } = useUserContext();

    const [ eventType, setEventType ] = useState("presential");

    const [ titleInputContent, setTitleInputContent ] = useState("");
    const [ descriptionInputContent, setDescriptionInputContent ] = useState("");
    const [ dateInputContent, setDateInputContent ] = useState("");
    const [ hourInputContent, setHourInputContent ] = useState("");
    const [ guestLimitInputContent, setGuestLimitInputContent ] = useState("");
    const [ locationInputContent, setLocationInputContent ] = useState("");
    const [ eventBannerInputContent, setEventBannerInputContent ] = useState(null);

    const handleTitleInputChange = (event) => {
        setTitleInputContent(event.target.value);
    }

    const handleDescriptionInputChange = (event) => {
        setDescriptionInputContent(event.target.value);
    }

    const handleDataInputChange = (event) => {
        setDateInputContent(event.target.value);
    }

    const handleHourInputChange = (event) => {
        setHourInputContent(event.target.value);
    }

    const handleGuestLimitInputChange = (event) => {
        setGuestLimitInputContent(event.target.value);
    }

    const handleLocationInputChange = (event) => {
        setLocationInputContent(event.target.value);
    }

    const handleEventBannerInputChange = (event) => {
        setEventBannerInputContent(event.target.files[0]);
    }

    const handleSubmitSucess = () => {
        fetchData();
        setEventModal(false);
    }

    const handlePresentialEventSubmit = async(event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("title", titleInputContent);
        formData.append("description", descriptionInputContent);
        formData.append("date", dateInputContent);
        formData.append("hour", hourInputContent);
        formData.append("guestLimit", guestLimitInputContent.toString());
        formData.append("organizerId", loggedUser);
        if(eventBannerInputContent){
            formData.append("image", eventBannerInputContent);
        }
        formData.append("location", locationInputContent);

        console.log(formData.get("guestLimit"));
        try{
            const response = await api.post("/event/create/presential", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(response.data)
            handleSubmitSucess();
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className={style.event_modal}>
            <div className={style.add_event}>
                <p className={style.close_add_event} onClick={() => setEventModal(false)}><ArrowBackIosIcon sx={{fill: "#004643"}}/> Close</p>
                <h1>Adding a new event</h1>
                <p>Here you will add the details for the new event that you are planning, after this, people can subscribe on your event</p>
                <h2>Event type:</h2>
                <p className={style.type_select}> <span className={eventType == "presential" ? style.active : ""} onClick={() => setEventType("presential")}>Presential</span> | <span className={eventType == "online" ? style.active : ""} onClick={() => setEventType("online")}>Online</span></p>
                {eventType == "presential" &&
                    <form onSubmit={handlePresentialEventSubmit}>
                        <div>
                            <input className={style.normal_input} type="text" placeholder="Event title" value={titleInputContent} onChange={handleTitleInputChange}/>
                            <textarea type="text" placeholder="Description" value={descriptionInputContent} onChange={handleDescriptionInputChange}/>
                            <input className={style.normal_input} type="date" value={dateInputContent} onChange={handleDataInputChange}/>
                            <input className={style.normal_input} type="time" value={hourInputContent} onChange={handleHourInputChange}/>
                            <input className={style.normal_input} type="number" placeholder="Guest limit" value={guestLimitInputContent} onChange={handleGuestLimitInputChange}/>
                            <input className={style.normal_input} type="text" placeholder="Location"value={locationInputContent} onChange={handleLocationInputChange}/>
                            <input type="file" accept="image/*" onChange={handleEventBannerInputChange}/>
                        </div>
                    <button type="submit">Create</button>
                    </form>
                }
            </div>
        </div>
    )
}