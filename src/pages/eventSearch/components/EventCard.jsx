import style from "../EventSearch.module.css";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PeopleIcon from '@mui/icons-material/People';
import LinkIcon from '@mui/icons-material/Link';
import { useLocation, useNavigate } from "react-router-dom";

export const EventCard = ({EventId, EventBanner, EventLink, EventTitle, EventType, EventLocal, EventDate, EventHour, EventGuestLimit, EventHostName}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenEventDetails = ( id ) => {
        navigate(`/event-search/details/${id}`, {state: {from: location.pathname}});
    };

    return(
        <div className={style.event_card}>
            <div className={style.card_image}>
                <img src={EventBanner} />
            </div>
            <div className={style.card_infos}>
                <p className={style.card_title}>{EventTitle}</p>
                <p><AccessTimeIcon sx={{fill: '#004643'}} /> {`${EventDate[2]}/${EventDate[1]}/${EventDate[0]}, ${EventHour[0]}:${EventHour[1]}`}</p>
                {EventType == "PRESENTIAL" &&
                    <p><LocationPinIcon sx={{fill: '#004643'}} />{EventLocal}</p>
                }
                {EventType == "ONLINE" &&
                    <p><LinkIcon sx={{fill: '#004643'}} />{EventLink}</p>
                }
                <p><PeopleIcon sx={{fill: '#004643'}} />Limit: {EventGuestLimit} person</p>
                <p><PeopleIcon sx={{fill: '#004643'}} />{EventHostName}</p>
                <button onClick={() => handleOpenEventDetails(EventId)}>More details</button>
            </div>
        </div>
    );
}