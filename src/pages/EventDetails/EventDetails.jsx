import { useLocation, useNavigate, useParams } from "react-router-dom"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PeopleIcon from '@mui/icons-material/People';
import api from "../../services/Api";

import style from "./EventDetails.module.css"
import { useEffect, useState } from "react";
import { Accessibility, DateRange } from "@mui/icons-material";
import { useUserContext } from "../../contexts/UserContext";

export const EventDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from;

    const { loggedUser } = useUserContext();

    const { id } = useParams();

    const [ loading, setLoading ] = useState(false);

    const [ eventData, setEventData ] = useState(null);
    const [ organizerData, setOrganizerData ] = useState(null);

    const handleBackPage = () => {
        if(from){
            navigate(-1)
        }else{
            navigate("/event-search")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async() => {
        setLoading(true);

        const response = await api.get(`/event/find/${id}`);

        const organizerData = await api.get(`/user/profile/${response.data.organizerId}`);

        setEventData(response.data);
        setOrganizerData(organizerData.data);

        setLoading(false);
    }

    const handleSubscription = async() => {
        if(loggedUser != null){
            const response = await api.post(`/subscription/create/${id}/${loggedUser.id}`);
            fetchData();
        }else{
            navigate(`/login?fromEvent=${id}`)
        }
    }

    const handleCancelSubscription = async() => {
        const response =  await api.post(`/subscription/cancel/${id}/${loggedUser.id}`);
        fetchData();
    }

    return (
        <>
            <div className={style.navbar}>
                <div className={style.return_button} onClick={handleBackPage}><ArrowBackIcon sx={{fill: '#004643'}}/></div>
                <div className={style.header_logo}><img src="/images/LogoWhite.png" />  -  Details</div>
            </div>
            <div className={style.event_list_area}>
                <div className={style.event_area}>
                    {eventData != null &&
                        <>
                            <div className={style.event_information}>
                                <div className={style.event_card}>
                                    <h1>{eventData.title}</h1>
                                    <div className={style.event_image}>
                                        <img src={`http://localhost:8080${eventData.imagePath}`} />
                                    </div>
                                    <div className={style.organizer}>
                                        <div className={style.organizer_profile_pic}>{organizerData != null && <img src={`http://localhost:8080${organizerData.profilePicPath}`}/>}</div>
                                        <div className={style.organizer_name}>{eventData.organizerName}</div>
                                    </div>
                                    <div className={style.description}>
                                        <h2>Description</h2>
                                        <p>{eventData.description}</p>
                                    </div>
                                    <button className={style.subscribe} onClick={eventData.subscriptionList.some(subs => subs.userId === loggedUser.id) ? handleCancelSubscription : handleSubscription}>Subscribe</button>
                                </div>
                                <div className={style.more_infos}>
                                    <h1>More information</h1>
                                    <h2><Accessibility sx={{fill: "#004643"}} />Type: {eventData.type}</h2>
                                    <h2><DateRange sx={{fill: "#004643"}} />Date: {`${eventData.date[2]}/${eventData.date[1]}/${eventData.date[0]}`}</h2>
                                    <h2><AccessTimeIcon sx={{fill: "#004643"}} />Hour: {`${eventData.hour[0]}:${eventData.hour[1]}`}</h2>
                                    <h2><LocationPinIcon sx={{fill: "#004643"}} />Guest limit: {eventData.subscriptionList.length} / {eventData.guestLimit}</h2>
                                    <h2><LocationPinIcon sx={{fill: "#004643"}} />Local: {`${eventData.location}`}</h2>
                                    <iframe className={style.map} width="100%" height="300" loading="lazy" allowFullScreen src={`https://www.google.com/maps?q=${eventData.latitude},${eventData.longitude}&output=embed`} />
                                </div>
                            </div>
                            <div className={style.divisory}>.</div>
                            <div className={style.event_information}>
                                <div className={style.other_events}>
                                    <h2>Other events from this organizer</h2>
                                    {organizerData.eventList.filter((event) => event.id != id).length == 0 ? "No more events from this organizer" : 
                                        <>
                                            {organizerData.eventList.filter((event) => event.id != id).map(event => 
                                                <div className={style.other_event_item} onClick={() => navigate(`/event-search/details/${event.id}`, {state: {from: location.pathname}})}>
                                                    <img src={`http://localhost:8080${event.imagePath}`} />
                                                    <div className={style.item_text}>
                                                        <h3>{event.title}</h3>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}