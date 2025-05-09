import { useParams } from "react-router-dom"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PeopleIcon from '@mui/icons-material/People';
import api from "../../services/Api";

import style from "./EventDetails.module.css"
import { useEffect, useState } from "react";

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
                        <h1>Titulo do evento</h1>
                        <div className={style.event_image}>
                            image
                        </div>
                        <div className={style.organizer}>
                            <div className={style.organizer_profile_pic}>

                            </div>
                            <div className={style.organizer_name}>Nome do organizador</div>
                        </div>
                        <div className={style.description}>
                            <h2>Description</h2>
                            <p>texto grande que ocupa muito espaço para testar se as descrições vão caber perfeitamente e não vão quebrar o layout do sistema de maneira porca e mal feita,texto grande que ocupa muito espaço para testar se as descrições vão caber perfeitamente e não vão quebrar o layout do sistema de maneira porca e mal feita</p>
                        </div>
                    </div>
                    <div className={style.event_information}>
                        <div>
                        <h2>Localização</h2>
                        <div className={style.event_image}>
                            image
                        </div>
                        <div className={style.description}>
                            <h3><LocationPinIcon sx={{fill: "#004643"}}/> Rua 191, São Paulo, SP</h3>
                            <h3><PeopleIcon sx={{fill: "#004643"}}/>Guest Limits: 42 / 50</h3>
                            <h3><AccessTimeIcon sx={{fill: "#004643"}}/>Date: 10/10/25, 13:30</h3>
                        </div>
                        </div>
                        <div className={style.subscribe_button}>Subscribe</div>
                    </div>
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