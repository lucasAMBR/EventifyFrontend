import style from "./Search.module.css"
import { useEffect, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import api from "../../services/Api"
import { useUserContext } from "../../contexts/UserContext"


import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PeopleIcon from '@mui/icons-material/People';
import LinkIcon from '@mui/icons-material/Link';

export const Search = () => {

    const {loggedUser} = useUserContext();

    const [ searchType, setSearchType ] = useState("User");

    const [ searchEventBy, setSearchEventBy ] = useState("date");

    const [ searchTerm, setSearchTerm ] = useState("");

    const [ loggedUserFollowing, setLoggedUserFollowing ] = useState([]);
    const followingIds = loggedUserFollowing.map(item => item.id);

    const [ loggedUserSubscriptions, setLoggedUserSubscriptions ] = useState([]);
    const subscriptionEventIds = loggedUserSubscriptions.map(item => item.eventId);

    const [ allRegisteredEvents, setAllRegisteredEvents ] = useState([]);
    const [ allRegisteredUsers, setAllRegisteredUsers ] = useState([]);
    const [ allRegisteredPosts, setAllRegisteredPosts ] = useState([]);

    function formatNumber(n) {
        return String(n).padStart(2, '0');
    }

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    const fetchAllEvents = async() => {
        const response = await api.get("/event/list");

        setAllRegisteredEvents(response.data);
    }

    const fetchAllUsers = async() => {
        const response = await api.get("/user/lista");

        setAllRegisteredUsers(response.data);
    }

    const fetchAllPosts = async() => {
        const response = await api.get("/post/list");

        setAllRegisteredPosts(response.data);
    }

    const fetchLoggedUserFollowing = async() => {
        const response = await api.get(`/user/profile/${loggedUser}`);

        setLoggedUserFollowing(response.data.following);
    }

    const fetchLoggedUserSubscriptions = async() => {
        const response = await api.get(`/subscription/list/user/${loggedUser}`);

        setLoggedUserSubscriptions(response.data);
    }

    const handleFollowUser = async(userId) => {
        try{
            const response = await api.post(`/user/follow/${loggedUser}/${userId}`);

            fetchAllUsers();
            fetchLoggedUserFollowing();
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        document.title = "Eventfy - Search"
    }, [])

    useEffect(() => {
        fetchAllEvents();
        fetchLoggedUserFollowing();
        fetchLoggedUserSubscriptions();
        fetchAllUsers();
        fetchAllPosts();
    }, [])

    return(
        <div className={style.search_area}>
            <div className={style.search_bar}>
                <div className={style.search_bar_icon}>
                    <SearchIcon />
                </div>
                <input className={style.bar_input} type="text" placeholder="type here a term, a name, anything..." value={searchTerm} onChange={handleSearchTerm}/>
            </div>
            <div className={style.search_type}>
                <button onClick={() => setSearchType("User")} className={searchType == "User" ? [style.default_button, style.active_button].join(" ") : style.default_button}>Search for Users</button>
                <button onClick={() => setSearchType("Event")} className={searchType == "Event" ? [style.default_button, style.active_button].join(" ") : style.default_button}>Search for Events</button>
                <button onClick={() => setSearchType("Post")} className={searchType == "Post" ? [style.default_button, style.active_button].join(" ") : style.default_button}>Search for Posts</button>
            </div>
            {searchType == "Event" &&
            <div className={style.search_event_by}>
                <button className={searchEventBy == "date" ? [style.default_button, style.active_button].join(" ") : style.default_button} onClick={() => setSearchEventBy("date")}>by date</button>
                <button className={searchEventBy == "location" ? [style.default_button, style.active_button].join(" ") : style.default_button} onClick={() => setSearchEventBy("location")}>by location</button>
                <button className={searchEventBy == "type" ? [style.default_button, style.active_button].join(" ") : style.default_button} onClick={() => setSearchEventBy("type")}>by type</button>
                <button className={searchEventBy == "organizer" ? [style.default_button, style.active_button].join(" ") : style.default_button} onClick={() => setSearchEventBy("organizer")}>by organizer</button>
            </div>
            }
            {searchTerm == "" &&
                <div className={style.data_exib}>
                    <h2>Popular Users</h2>
                    <div className={style.userList}>
                    {allRegisteredUsers
                        .filter(item => item.id !== loggedUser).sort((a,b) => b.followers - a.followers).slice(0, 3).map((item, index) => (
                            <div key={item.id} className={style.user_card}>
                                <div className={style.user_card_image}>
                                    <img src={`http://localhost:8080${item.profilePicPath}`} alt="user_profile" />
                                </div>
                                <p className={style.user_card_name}>{item.name}</p>
                                <div className={style.user_card_info}>
                                    <p><span>{item.followers}</span> Followers</p>
                                    <p><span>{item.following}</span> Following</p>
                                    <p><span>{item.posts}</span> Posts</p>   
                                </div>
                                <div className={followingIds.includes(item.id) ? style.user_card_button_unfollow : style.user_card_button}>
                                    <button onClick={() => handleFollowUser(item.id)}>
                                        {followingIds.includes(item.id) ? "Unfollow" : "Follow"}
                                    </button>
                                </div>
                           </div>
                    ))}
                    </div>
                    <h2>Popular Events</h2>
                    <div className={style.userList}>
                        {allRegisteredEvents.filter(item => item.organizerId !== loggedUser).length == 0 && <p>No events found</p>}
                        {allRegisteredEvents.slice(0, 3).filter(item => item.organizerId !== loggedUser).map((item, index) => (
                            <div className={style.event_card}>
                                <div className={style.event_card_image}>
                                    <img src={`http://localhost:8080${item.imagePath}`} alt="event_image" />
                                </div>
                                <div className={style.event_card_info}>
                                    <h3 className={style.event_card_title}>{item.title}</h3>
                                    <p>Type: {item.type}</p>
                                    <p className={style.event_card_date}><AccessTimeIcon /> {`${formatNumber(item.date[2])}/${formatNumber(item.date[1])}/${formatNumber(item.date[0])}, ${formatNumber(item.hour[0])}:${formatNumber(item.hour[1])}`}</p>
                                    {item.type == "PRESENTIAL" &&
                                        <p className={style.event_card_location}><LocationPinIcon /> {item.location}</p>
                                    }
                                    {item.type == "ONLINE" &&
                                        <p className={style.event_card_location}><LinkIcon /> {item.link}</p>
                                    }
                                    <p className={style.event_card_organizer_name}><PeopleIcon /> {item.organizerName}</p>
                                </div>
                                <div className={style.event_card_button}>
                                    <button className={subscriptionEventIds.includes(item.id) ? style.unsubscribe_button : style.subscribe_button}>{subscriptionEventIds.includes(item.id) ? "Unsubscribe" : "Subscribe"}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2>Popular Posts</h2>
                    <div className={style.userList}>
                        {allRegisteredPosts.length == 0 && <p>No posts found</p>}
                        {allRegisteredPosts.slice(0, 3).filter(item => item.userId !== loggedUser).sort((a,b) => {
                            const totalA = a.likeList.length + a.commentList.length;
                            const totalB = b.likeList.length + b.commentList.length;

                            return totalB - totalA;
                        }).map((item, index) => (
                            <div className={style.post_card}>
                                <div className={style.post_user_info}>
                                    <div className={style.post_user_image}>
                                        <img src={`http://localhost:8080${item.userProfilePic}`} alt="user_profile" />
                                    </div>
                                    <div className={style.post_user_info_text}>
                                    <p><span>{item.userName}</span></p>
                                    <p>{item.date[2]}/{item.date[1]}/{item.date[0]}, {item.date[3]}:{item.date[4]}</p>
                                    </div>
                                </div>
                                <p className={style.post_content}>{item.content}</p>
                                <div className={style.post_actions}>
                                    <div className={style.post_likes}>
                                        <FavoriteBorderIcon />
                                        {item.likeList.length}
                                    </div>
                                    <div className={style.post_comments}>
                                        <ChatBubbleOutlineIcon />
                                        {item.commentList.length}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {searchTerm != "" && searchType == "User" &&
                <div className={style.data_exib}>
                    <h2>Users</h2>
                    <div className={style.userList}>
                        {allRegisteredUsers.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => (
                            <div key={item.id} className={style.user_card}>
                            <div className={style.user_card_image}>
                                <img src={`http://localhost:8080${item.profilePicPath}`} alt="user_profile" />
                            </div>
                            <p className={style.user_card_name}>{item.name}</p>
                            <div className={style.user_card_info}>
                                <p><span>{item.followers}</span> Followers</p>
                                <p><span>{item.following}</span> Following</p>
                                <p><span>{item.posts}</span> Posts</p>   
                            </div>
                            <div className={followingIds.includes(item.id) ? style.user_card_button_unfollow : style.user_card_button}>
                                <button onClick={() => handleFollowUser(item.id)}>
                                    {followingIds.includes(item.id) ? "Unfollow" : "Follow"}
                                </button>
                            </div>
                       </div>
                        ))}
                    </div>
                </div>
            }
            {searchTerm != "" && searchType == "Event" &&
                <div className={style.data_exib}>
                    <h2>Searching for events: including "{searchTerm}"</h2>
                    <div className={style.userList}>
                        {allRegisteredEvents.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())).length == 0 && <p>No events found</p>}
                        {allRegisteredEvents.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => (
                            <div className={style.event_card}>
                                <div className={style.event_card_image}>
                                    <img src={`http://localhost:8080${item.imagePath}`} alt="event_image" />
                                </div>
                            <div className={style.event_card_info}>
                                <h3 className={style.event_card_title}>{item.title}</h3>
                                <p>Type: {item.type}</p>
                                <p className={style.event_card_date}><AccessTimeIcon /> {`${formatNumber(item.date[2])}/${formatNumber(item.date[1])}/${formatNumber(item.date[0])}, ${formatNumber(item.hour[0])}:${formatNumber(item.hour[1])}`}</p>
                                {item.type == "PRESENTIAL" &&
                                    <p className={style.event_card_location}><LocationPinIcon /> {item.location}</p>
                                }
                                {item.type == "ONLINE" &&
                                    <p className={style.event_card_location}><LinkIcon /> {item.link}</p>
                                }
                                <p className={style.event_card_organizer_name}><PeopleIcon /> {item.organizerName}</p>
                            </div>
                            </div>
                            ))}
                    </div>
                </div>
            }       
        </div>
    )
}