import { Description } from "@mui/icons-material";
import style from "../Events.module.css";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PeopleIcon from '@mui/icons-material/People';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const EventCard = ({EventId, EventBanner, EventTitle, EventLocal, EventDate, EventHour, EventGuestLimit}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenEventDetails = ( id ) => {
        navigate(`/event-search/details/${id}`, {state: {from: location.pathname}});
    };

    const [ updateModalIsOpen, setUpdateModalIsOpen ] = useState(false);
    const [ choosedEvent, setChoosedEvent ] = useState()

    const handleOpenModal = (id) => {
        setChoosedEvent(id);
        setUpdateModalIsOpen(true);
    }

    return(
        <div className={style.event_card}>
            <div className={style.card_image}>
                <img src={EventBanner} />
            </div>
            <div className={style.card_infos}>
                <p className={style.card_title}>{EventTitle}</p>
                <p><AccessTimeIcon sx={{fill: '#004643'}} /> {`${EventDate[2]}/${EventDate[1]}/${EventDate[0]}, ${EventHour[0]}:${EventHour[1]}`}</p>
                <p><LocationPinIcon sx={{fill: '#004643'}} />{EventLocal}</p>
                <p><PeopleIcon sx={{fill: '#004643'}} />Limit: {EventGuestLimit} person</p>
                <button onClick={() => handleOpenEventDetails(EventId)}>View event feed</button>
                <button onClick={() => handleOpenModal(EventId)}>Edit event data</button>
            </div>
        </div>
    );
}