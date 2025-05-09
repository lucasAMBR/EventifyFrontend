import { useParams } from "react-router-dom"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PeopleIcon from '@mui/icons-material/People';
import api from "../../services/Api";

import style from "./EventDetails.module.css"
import { useEffect, useState } from "react";
import { Accessibility, DateRange } from "@mui/icons-material";

export const EventDetails = () => {

    const { id } = useParams();

    const [ loading, setLoading ] = useState(false);
    const [ eventData, setEventData ] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async() => {
        setLoading(true);

        const response = await api.get(`/event/find/${id}`);

        setEventData(response.data);
        setLoading(false);
    }

    return (
        <>
            <div className={style.navbar}>
                <div className={style.return_button} onClick={() => navigate("/")}><ArrowBackIcon sx={{fill: '#004643'}}/></div>
                <div className={style.header_logo}><img src="/images/LogoWhite.png" />  -  Details: {"Titulo do evento"}</div>
            </div>
            <div className={style.event_list_area}>
                <div className={style.event_area}>
                    <div className={style.event_information}>
                        <div className={style.event_card}>
                            <h1>Titulo do evento</h1>
                            <div className={style.event_image}>
                                image
                            </div>
                            <div className={style.organizer}>
                                <div className={style.organizer_profile_pic}></div>
                                <div className={style.organizer_name}>Organizer name</div>
                            </div>
                            <div className={style.description}>
                                <h2>Description</h2>
                                <p>testetestetestetestetestetestetestetesteteste testetesteteste testetestetesteteste testetestetesteteste testetestetesteteste</p>
                            </div>
                            <button className={style.subscribe}>Subscribe</button>
                        </div>
                        <div className={style.more_infos}>
                            <h1>More information</h1>
                            <h2><Accessibility sx={{fill: "#004643"}} />Type: PRESENTIAL</h2>
                            <h2><DateRange sx={{fill: "#004643"}} />Date: 10/10/25</h2>
                            <h2><AccessTimeIcon sx={{fill: "#004643"}} />Hour: 10:30</h2>
                            <h2><LocationPinIcon sx={{fill: "#004643"}} />Local: Rua 123, São Paulo, SP</h2>
                            <h2><LocationPinIcon sx={{fill: "#004643"}} />Map: </h2>
                            <div className={style.event_image}>image</div>
                        </div>
                    </div>
                    <div className={style.divisory}>.</div>
                    <div className={style.event_information}>
                        <div className={style.other_events}>
                            <h2>Other events from ths organizer</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}