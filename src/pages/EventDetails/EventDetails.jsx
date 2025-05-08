import { useParams } from "react-router-dom"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
                <div className={style.header_logo}><img src="/images/LogoWhite.png" />  -  Details: {eventData != null && `${eventData.title}`}</div>
            </div>
            <div className={style.event_list_area}>
                {eventData != null ? `${eventData.title}` : "Erro"}
            </div>
        </>
    )
}