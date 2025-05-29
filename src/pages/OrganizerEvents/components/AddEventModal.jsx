import { useState } from "react";
import { ArrowBackIosIcon } from "@mui/icons-material";
import style from "../Events.module.css";

export const AddEventModal = () => {

    const [ eventType, setEventType ] = useState("presential");

    return(
        <div className={style.event_modal}>
            <div className={style.add_event}>
                <p><ArrowBackIosIcon sx={{fill: "#ffffff"}}/> Close</p>
                <h1>Adding a new event</h1>
                <p>Here you will add the details for the new event that you are planning, after this, people can subscribe on your event</p>
                <h2>Event type:</h2>
                <p className={style.type_select}> <span className={eventType == "presential" ? style.active : ""} onClick={() => setEventType("presential")}>Presential</span> | <span className={eventType == "online" ? style.active : ""} onClick={() => setEventType("online")}>Online</span></p>
                {eventType == "presential" &&
                    <form>
                        <div>
                            <input className={style.normal_input} type="text" placeholder="Event title" />
                            <textarea type="text" placeholder="Description" />
                            <input className={style.normal_input} type="date" />
                            <input className={style.normal_input} type="time" />
                            <input className={style.normal_input} type="number" placeholder="Guest limit" />
                            <input className={style.normal_input} type="text" placeholder="Location"/>
                            <input type="file" />
                        </div>
                    <button type="submit">Create</button>
                    </form>
                }
            </div>
        </div>
    )
}