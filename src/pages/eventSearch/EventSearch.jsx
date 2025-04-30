import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import api from "../../services/Api";

import style from "./EventSearch.module.css";
import { useEffect, useState } from 'react';
import { EventCard } from './components/EventCard';

export const EventSearch = () => {
    
    useEffect(() => {
        document.title = "Eventfy - Search"

        fetchPopularEvents();
    }, [])

    const [ allRegisterEvents, setAllRegisterEvents ] = useState([]);
    const [ popularEvents, setPopularEvents ] = useState([]);
    const [ recentEvents, setRecentEvents ] = useState([]);

    const [ searchTerm, setSearchTerm ] = useState("");

    const fetchPopularEvents = async() => {
        const response = await api.get("/event/popular");

        setPopularEvents(response.data)
        console.log(popularEvents)
    }

    return(
        <>
            <div className={style.navbar}>
                <img src="/images/LogoWhite.png" />
                <div className={style.search_bar}>
                <div className={style.search_icon}><SearchIcon sx={{fill: '#004643'}} /></div>
                    <input type="text" placeholder="Search event..."/>
                    <div className={style.search_icon_alt}><FilterAltIcon sx={{fill: '#F9B663'}} /></div>
                </div>
            </div>
            <div className={style.event_list_area}>
                <div className={style.popular_events_list}>
                    <h2 onClick={() => console.log(popularEvents)}>Popular events</h2>
                    <div className={style.event_list}>
                        {popularEvents.length == 0 && "Sem eventos cadastrados..."}
                        {popularEvents.map((item) => 
                            <EventCard EventBanner={`http://localhost:8080${item.imagePath}`} EventTitle={item.title} EventDate={item.date} EventHour={item.hour} EventLocal={item.location} EventGuestLimit={item.guestLimit} EventHostName={item.organizerName}/>
                        )}
                    </div>
                </div>
                <div className={style.recent_events_list}>
                    <h2>Recent events</h2>
                    <div className={style.event_list}>
                    {popularEvents.length == 0 && "Sem eventos cadastrados..."}
                    {popularEvents.map((item) => 
                        <EventCard EventBanner={`http://localhost:8080${item.imagePath}`} EventTitle={item.title} EventDate={item.date} EventHour={item.hour} EventLocal={item.location} EventGuestLimit={item.guestLimit} EventHostName={item.organizerName}/>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}