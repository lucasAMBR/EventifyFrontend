import { Description } from "@mui/icons-material";
import style from "../Events.module.css";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationPinIcon from '@mui/icons-material/LocationPin'
import LinkIcon from '@mui/icons-material/Link';
import PeopleIcon from '@mui/icons-material/People';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const EventCard = ({EventId, EventBanner, EventTitle, EventType, EventLink, EventLocal, EventDate, EventHour, EventGuestLimit, handleOpenModal, openCancelModal}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenEventDetails = ( id ) => {
        navigate(`/event-search/details/${id}`, {state: {from: location.pathname}});
    };

    function formatNumber(n) {
        return String(n).padStart(2, '0');
    }

    return(
        <div className={style.event_card}>
            <div className={style.card_image}>
                <img src={EventBanner} />
            </div>
            <div className={style.card_infos}>
                <p className={style.card_title}>{EventTitle}</p>
                <p><AccessTimeIcon sx={{fill: '#004643'}} /> {`${formatNumber(EventDate[2])}/${formatNumber(EventDate[1])}/${formatNumber(EventDate[0])}, ${formatNumber(EventHour[0])}:${formatNumber(EventHour[1])}`}</p>
                {EventType == "PRESENTIAL" &&
                    <p><LocationPinIcon sx={{fill: '#004643'}} />{EventLocal}</p>
                }
                {EventType == "ONLINE" &&
                    <p><LinkIcon sx={{fill: '#004643'}} />{EventLink}</p>
                }
                <p><PeopleIcon sx={{fill: '#004643'}} />Limit: {EventGuestLimit} person</p>
                <button className={style.normal_button} onClick={() => handleOpenEventDetails(EventId)}>View event feed</button>
                <button className={style.normal_button} onClick={() => handleOpenModal(EventId)}>Generate confirmation link</button>
                <button className={style.normal_button} onClick={() => handleOpenModal(EventId)}>Edit event data</button>
                <button className={style.cancel_button} onClick={() => openCancelModal(EventId)}>Cancel event</button>
            </div>
        
        </div>
    );
}