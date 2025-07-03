import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from "../../services/Api";

import style from "./EventSearch.module.css";
import { useEffect, useState } from 'react';
import { EventCard } from './components/EventCard';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const EventSearch = () => {

    const navigate = useNavigate();

    const [ searchParams, setSearchParams ] = useSearchParams();
    const searchTerm = searchParams.get("searchTerm") || "";
    const searchType = searchParams.get("searchType") || "title";

    useEffect(() => {
        document.title = "Eventfy - Search";

        fetchPopularEvents();
        fetchRecentEvents();
        fetchAllEvents();
    }, []);

    const [ allRegisteredEvents, setAllRegisteredEvents ] = useState([]);
    const [ popularEvents, setPopularEvents ] = useState([]);
    const [ recentEvents, setRecentEvents ] = useState([]);

    const [ filterSelectIsOpen, setFilterSelectIsOpen ] = useState(false);

    const fetchPopularEvents = async () => {
        const response = await api.get("/event/popular");

        setPopularEvents(response.data);
    };

    const fetchRecentEvents = async () => {
        const response = await api.get("/event/recent");

        setRecentEvents(response.data);
    };

    const fetchAllEvents = async () => {
        const response = await api.get("/event/list");

        setAllRegisteredEvents(response.data);
    };

    const handleSearchTerm = (event) => {
        setSearchParams({searchTerm: event.target.value, searchType});
    };

    const handleSearchTypeChange = (type) => {
        setSearchParams({searchTerm, searchType: type});
    };

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    return (
        <>
            <div className={style.navbar}>
                <div className={style.return_button} onClick={() => navigate("/")}>
                    <ArrowBackIcon sx={{fill: '#004643'}}/>
                </div>
                <div className={style.header_logo}>
                    <img src="/images/LogoWhite.png" />  -  Search
                </div>
                <div className={style.search_bar}>
                    <div className={style.search_icon}>
                        <SearchIcon sx={{fill: '#004643'}} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search event..."
                        value={searchTerm}
                        onChange={handleSearchTerm}
                    />
                    <div className={style.search_icon_alt}>
                        <FilterAltIcon
                            sx={{fill: '#F9B663'}}
                            onClick={() => setFilterSelectIsOpen(!filterSelectIsOpen)}
                        />
                    </div>
                </div>
            </div>
            <div className={style.event_list_area}>

                <div className={style.mobile_search}>
                    <div className={style.mobile_icon}><SearchIcon /></div>
                    <div className={style.mobile_input_area}>
                        <input
                            type='text'
                            className={style.mobile_input}
                            placeholder='Search for a event...'
                            value={searchTerm}
                            onChange={handleSearchTerm}
                        />
                        <div
                            className={style.mobile_filter}
                            onClick={() => setFilterSelectIsOpen(!filterSelectIsOpen)}
                        >
                            <FilterAltIcon />
                        </div>
                    </div>
                </div>

                {filterSelectIsOpen &&
                    <div className={style.filters}>
                        <h2>Search for: </h2>
                        <div className={style.checkbox_area} onClick={() => handleSearchTypeChange("title")}>
                            <div className={style.checkbox_item}>
                                <div className={searchType == "title" ? style.checked : style.unchecked}></div>
                            </div>
                            <div className={style.checkbox_text}>
                                Title
                            </div>
                        </div>
                        <div className={style.checkbox_area} onClick={() => handleSearchTypeChange("organizer")}>
                            <div className={style.checkbox_item}>
                                <div className={searchType == "organizer" ? style.checked : style.unchecked}></div>
                            </div>
                            <div className={style.checkbox_text}>
                                Organizer
                            </div>
                        </div>
                        <div className={style.checkbox_area} onClick={() => handleSearchTypeChange("location")}>
                            <div className={style.checkbox_item}>
                                <div className={searchType == "location" ? style.checked : style.unchecked}></div>
                            </div>
                            <div className={style.checkbox_text}>
                                Location
                            </div>
                        </div>
                    </div>
                }

                {searchTerm == "" &&
                    <>
                        <div className={style.popular_events_list}>
                            <h2 onClick={() => console.log(popularEvents)}>Popular events</h2>
                            <div className={style.event_list}>
                                {popularEvents.length == 0 && "No registered events..."}
                                {popularEvents.map((item, index) =>
                                    <EventCard
                                        key={index}
                                        EventId={item.id}
                                        EventType={item.type}
                                        EventLink={item.link}
                                        EventBanner={`http://localhost:8080${item.imagePath}`}
                                        EventTitle={item.title}
                                        EventDate={item.date}
                                        EventHour={item.hour}
                                        EventLocal={item.location}
                                        EventGuestLimit={item.guestLimit}
                                        EventHostName={item.organizerName}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={style.recent_events_list}>
                            <h2>Recent events</h2>
                            <div className={style.event_list}>
                                {recentEvents.length == 0 && "No registered events..."}
                                {recentEvents.map((item, index) =>
                                    <EventCard
                                        key={index}
                                        EventId={item.id}
                                        EventType={item.type}
                                        EventLink={item.link}
                                        EventBanner={`http://localhost:8080${item.imagePath}`}
                                        EventTitle={item.title}
                                        EventDate={item.date}
                                        EventHour={item.hour}
                                        EventLocal={item.location}
                                        EventGuestLimit={item.guestLimit}
                                        EventHostName={item.organizerName}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                }

                {searchTerm != "" && searchType == "title" &&
                    <div className={style.popular_events_list}>
                        <h2 onClick={() => console.log(popularEvents)}>Searching for: {searchTerm}</h2>
                        <div className={style.event_list}>
                            {allRegisteredEvents.filter((event) => normalizeText(event.title.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase()))).length == 0
                                ? "No events founded..."
                                :
                                <>
                                    {allRegisteredEvents.filter((event) => normalizeText(event.title.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase()))).map((item, index) =>
                                        <EventCard
                                            key={index}
                                            EventId={item.id}
                                            EventType={item.type}
                                            EventLink={item.link}
                                            EventBanner={`http://localhost:8080${item.imagePath}`}
                                            EventTitle={item.title}
                                            EventDate={item.date}
                                            EventHour={item.hour}
                                            EventLocal={item.location}
                                            EventGuestLimit={item.guestLimit}
                                            EventHostName={item.organizerName}
                                        />
                                    )}
                                </>
                            }
                        </div>
                    </div>
                }

                {searchTerm != "" && searchType == "organizer" &&
                    <div className={style.popular_events_list}>
                        <h2 onClick={() => console.log(popularEvents)}>Searching for: {searchTerm}</h2>
                        <div className={style.event_list}>
                            {allRegisteredEvents.filter((event) => normalizeText(event.organizerName.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase()))).length == 0
                                ? "No events founded..."
                                :
                                <>
                                    {allRegisteredEvents.filter((event) => normalizeText(event.organizerName.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase()))).map((item, index) =>
                                        <EventCard
                                            key={index}
                                            EventId={item.id}
                                            EventType={item.type}
                                            EventLink={item.link}
                                            EventBanner={`http://localhost:8080${item.imagePath}`}
                                            EventTitle={item.title}
                                            EventDate={item.date}
                                            EventHour={item.hour}
                                            EventLocal={item.location}
                                            EventGuestLimit={item.guestLimit}
                                            EventHostName={item.organizerName}
                                        />
                                    )}
                                </>
                            }
                        </div>
                    </div>
                }

                {searchTerm != "" && searchType == "location" &&
                    <div className={style.popular_events_list}>
                        <h2 onClick={() => console.log(popularEvents)}>Searching for: {searchTerm}</h2>
                        <div className={style.event_list}>
                            {allRegisteredEvents.filter((event) => normalizeText(event.location.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase()))).length == 0
                                ? "No events founded..."
                                :
                                <>
                                    {allRegisteredEvents.filter((event) => normalizeText(event.location.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase()))).map((item, index) =>
                                        <EventCard
                                            key={index}
                                            EventId={item.id}
                                            EventType={item.type}
                                            EventLink={item.link}
                                            EventBanner={`http://localhost:8080${item.imagePath}`}
                                            EventTitle={item.title}
                                            EventDate={item.date}
                                            EventHour={item.hour}
                                            EventLocal={item.location}
                                            EventGuestLimit={item.guestLimit}
                                            EventHostName={item.organizerName}
                                        />
                                    )}
                                </>
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
