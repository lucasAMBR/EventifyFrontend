import style from "../EventSearch.module.css";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PeopleIcon from '@mui/icons-material/People';

export const EventCard = ({EventId, EventBanner, EventTitle, EventLocal, EventDate, EventHour, EventGuestLimit, EventHostName}) => {

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
                <p><PeopleIcon sx={{fill: '#004643'}} />{EventHostName}</p>
                <button>More details</button>
            </div>
        </div>
    );
}