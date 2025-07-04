import style from "./Search.module.css";
import { useEffect, useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../services/Api";
import { useUserContext } from "../../contexts/UserContext";
import { PostItem } from "./components/PostItem";
import { SubscribeModal } from "./components/SubscribeModal";
import { CancelSubsModal } from "./components/CancelSubsModal";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PeopleIcon from "@mui/icons-material/People";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";

export const Search = () => {
    const navigate = useNavigate();

    const { loggedUser, userRole } = useUserContext();

    const [searchType, setSearchType] = useState("User");
    const [searchEventBy, setSearchEventBy] = useState("title");
    const [searchPostBy, setSearchPostBy] = useState("content");
    const [searchTerm, setSearchTerm] = useState("");

    const [loggedUserFollowing, setLoggedUserFollowing] = useState([]);
    const followingIds = useMemo(
        () => loggedUserFollowing.map((item) => item.id),
        [loggedUserFollowing]
    );

    const [loggedUserSubscriptions, setLoggedUserSubscriptions] = useState([]);
    const subscriptionEventIds = useMemo(
        () => loggedUserSubscriptions.map((item) => item.eventId),
        [loggedUserSubscriptions]
    );

    const [subscriptionModalIsOpen, setSubscriptionModalIsOpen] = useState(false);
    const [cancelSubsModalIsOpen, setCancelSubsModalIsOpen] = useState(false);
    const [chooseEventId, setChooseEventId] = useState(null);

    const [allRegisteredEvents, setAllRegisteredEvents] = useState([]);
    const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);
    const [allRegisteredPosts, setAllRegisteredPosts] = useState([]);

    const handleSubscriptionModal = (eventId) => {
        setChooseEventId(eventId);
        setSubscriptionModalIsOpen(true);
    };

    const handleCloseSubscriptionModal = () => {
        fetchAllEvents();
        fetchLoggedUserSubscriptions(); // Atualiza as inscrições após inscrever
        setSubscriptionModalIsOpen(false);
        setChooseEventId(null);
    };

    const handleCancelSubsModal = (eventId) => {
        setChooseEventId(eventId);
        setCancelSubsModalIsOpen(true);
    };

    const handleCloseCancelSubsModal = () => {
        fetchAllEvents();
        fetchLoggedUserSubscriptions(); // Atualiza as inscrições após cancelar
        setCancelSubsModalIsOpen(false);
        setChooseEventId(null);
    };

    function formatNumber(n) {
        return String(n).padStart(2, "0");
    }

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const fetchAllEvents = async () => {
        const response = await api.get("/event/list");
        setAllRegisteredEvents(response.data);
    };

    const fetchAllUsers = async () => {
        const response = await api.get("/user/lista");
        setAllRegisteredUsers(response.data);
    };

    const fetchAllPosts = async () => {
        const response = await api.get("/post/list");
        setAllRegisteredPosts(response.data);
    };

    const fetchLoggedUserFollowing = async () => {
        const response = await api.get(`/user/profile/${loggedUser}`);
        setLoggedUserFollowing(response.data.following);
    };

    const fetchLoggedUserSubscriptions = async () => {
        const response = await api.get(`/subscription/list/user/${loggedUser}`);
        setLoggedUserSubscriptions(response.data);
    };

    const handleFollowUser = async (userId) => {
        try {
            await api.post(`/user/follow/${loggedUser}/${userId}`);
            fetchAllUsers();
            fetchLoggedUserFollowing();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        document.title = "Eventfy - Search";
    }, []);

    useEffect(() => {
        fetchAllEvents();
        fetchLoggedUserFollowing();
        fetchLoggedUserSubscriptions();
        fetchAllUsers();
        fetchAllPosts();
    }, []);

    return (
        <div className={style.search_area}>
            <div className={style.search_bar}>
                <div className={style.search_bar_icon}>
                    <SearchIcon />
                </div>
                <input
                    className={style.bar_input}
                    type="text"
                    placeholder="type here a term, a name, anything..."
                    value={searchTerm}
                    onChange={handleSearchTerm}
                />
            </div>
            <div className={style.search_type}>
                <button
                    onClick={() => setSearchType("User")}
                    className={
                        searchType == "User"
                            ? [style.default_button, style.active_button].join(" ")
                            : style.default_button
                    }
                >
                    Search for Users
                </button>
                <button
                    onClick={() => setSearchType("Event")}
                    className={
                        searchType == "Event"
                            ? [style.default_button, style.active_button].join(" ")
                            : style.default_button
                    }
                >
                    Search for Events
                </button>
                <button
                    onClick={() => setSearchType("Post")}
                    className={
                        searchType == "Post"
                            ? [style.default_button, style.active_button].join(" ")
                            : style.default_button
                    }
                >
                    Search for Posts
                </button>
            </div>
            {searchType == "Event" && (
                <div className={style.search_event_by}>
                    <button
                        className={
                            searchEventBy == "title"
                                ? [style.default_button, style.active_button].join(" ")
                                : style.default_button
                        }
                        onClick={() => setSearchEventBy("title")}
                    >
                        by title
                    </button>
                    <button
                        className={
                            searchEventBy == "date"
                                ? [style.default_button, style.active_button].join(" ")
                                : style.default_button
                        }
                        onClick={() => setSearchEventBy("date")}
                    >
                        by date
                    </button>
                    <button
                        className={
                            searchEventBy == "location"
                                ? [style.default_button, style.active_button].join(" ")
                                : style.default_button
                        }
                        onClick={() => setSearchEventBy("location")}
                    >
                        by location
                    </button>
                    <button
                        className={
                            searchEventBy == "type"
                                ? [style.default_button, style.active_button].join(" ")
                                : style.default_button
                        }
                        onClick={() => setSearchEventBy("type")}
                    >
                        by type
                    </button>
                    <button
                        className={
                            searchEventBy == "organizer"
                                ? [style.default_button, style.active_button].join(" ")
                                : style.default_button
                        }
                        onClick={() => setSearchEventBy("organizer")}
                    >
                        by organizer
                    </button>
                </div>
            )}
            {searchType == "Post" && (
                <div className={style.search_event_by}>
                    <button
                        className={
                            searchPostBy == "content"
                                ? [style.default_button, style.active_button].join(" ")
                                : style.default_button
                        }
                        onClick={() => setSearchPostBy("content")}
                    >
                        by content
                    </button>
                    <button
                        className={
                            searchPostBy == "user"
                                ? [style.default_button, style.active_button].join(" ")
                                : style.default_button
                        }
                        onClick={() => setSearchPostBy("user")}
                    >
                        by user
                    </button>
                </div>
            )}
            {searchTerm == "" && (
                <div className={style.data_exib}>
                    <h2>Popular Users</h2>
                    <div className={style.userList}>
                        {allRegisteredUsers.filter((item) => item.id !== loggedUser)
                            .length == 0 && <p>No users found</p>}
                        {allRegisteredUsers
                            .filter((item) => item.id !== loggedUser)
                            .sort((a, b) => b.followers - a.followers)
                            .slice(0, 3)
                            .map((item, index) => (
                                <div key={item.id} className={style.user_card}>
                                    <div className={style.user_card_image}>
                                        <img
                                            src={`http://localhost:8080${item.profilePicPath}`}
                                            alt="user_profile"
                                        />
                                    </div>
                                    <p
                                        className={style.user_card_name}
                                        onClick={() =>
                                            navigate(
                                                item.id == loggedUser
                                                    ? `/home/user/profile/me`
                                                    : `/home/user/profile/${item.id}`
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {item.name}
                                    </p>
                                    <div className={style.user_card_info}>
                                        <p>
                                            <span>{item.followers}</span> Followers
                                        </p>
                                        <p>
                                            <span>{item.following}</span> Following
                                        </p>
                                        <p>
                                            <span>{item.posts}</span> Posts
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            followingIds.includes(item.id)
                                                ? style.user_card_button_unfollow
                                                : style.user_card_button
                                        }
                                    >
                                        <button onClick={() => handleFollowUser(item.id)}>
                                            {followingIds.includes(item.id) ? "Unfollow" : "Follow"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <h2>Popular Events</h2>
                    <div className={style.userList}>
                        {allRegisteredEvents.filter(
                            (item) => item.organizerId !== loggedUser && item.active == true
                        ).length == 0 && <p>No events found</p>}
                        {allRegisteredEvents
                            .slice(0, 3)
                            .filter((item) => item.organizerId !== loggedUser && item.active == true)
                            .map((item, index) => (
                                <div className={style.event_card}>
                                    <div className={style.event_card_image}>
                                        <img
                                            src={`http://localhost:8080${item.imagePath}`}
                                            alt="event_image"
                                        />
                                    </div>
                                    <div className={style.event_card_info}>
                                        <h3 className={style.event_card_title}>{item.title}</h3>
                                        <p>Type: {item.type}</p>
                                        <p className={style.event_card_date}>
                                            <AccessTimeIcon />{" "}
                                            {`${formatNumber(item.date[2])}/${formatNumber(
                                                item.date[1]
                                            )}/${formatNumber(item.date[0])}, ${formatNumber(
                                                item.hour[0]
                                            )}:${formatNumber(item.hour[1])}`}
                                        </p>
                                        {item.type == "PRESENTIAL" && (
                                            <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                <LocationPinIcon /> {item.location}
                                            </p>
                                        )}
                                        {item.type == "ONLINE" && (
                                            <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                <LinkIcon /> {item.link}
                                            </p>
                                        )}
                                        <p className={style.event_card_organizer_name}>
                                            <PeopleIcon /> {item.organizerName}
                                        </p>
                                    </div>
                                    {userRole != "ORGANIZER" && (
                                        <div className={style.event_card_button}>
                                            <button
                                                onClick={
                                                    subscriptionEventIds.includes(item.id)
                                                        ? () => handleCancelSubsModal(item.id)
                                                        : () => handleSubscriptionModal(item.id)
                                                }
                                                className={
                                                    subscriptionEventIds.includes(item.id)
                                                        ? style.unsubscribe_button
                                                        : style.subscribe_button
                                                }
                                            >
                                                {subscriptionEventIds.includes(item.id)
                                                    ? "Unsubscribe"
                                                    : "Subscribe"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                    <h2>Popular Posts</h2>
                    <div className={style.userList}>
                        {allRegisteredPosts.filter(
                            (item) =>
                                item.userId !== loggedUser && !item.hasOwnProperty("eventId")
                        ).length == 0 && <p>No posts found</p>}
                        {allRegisteredPosts
                            .filter(
                                (item) =>
                                    item.userId !== loggedUser && !item.hasOwnProperty("eventId")
                            )
                            .slice(0, 3)
                            .sort((a, b) => {
                                const totalA = a.likeList.length + a.commentList.length;
                                const totalB = b.likeList.length + b.commentList.length;

                                return totalB - totalA;
                            })
                            .map((item, index) => (
                                <div className={style.post_card}>
                                    <div className={style.post_user_info}>
                                        <div className={style.post_user_image}>
                                            <img
                                                src={`http://localhost:8080${item.userProfilePic}`}
                                                alt="user_profile"
                                            />
                                        </div>
                                        <div className={style.post_user_info_text}>
                                            <p>
                                                <span>{item.userName}</span>
                                            </p>
                                            <p>
                                                {item.date[2]}/{item.date[1]}/{item.date[0]},{" "}
                                                {item.date[3]}:{item.date[4]}
                                            </p>
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
            )}
            {searchTerm != "" && searchType == "User" && (
                <div className={style.data_exib}>
                    <h2>Users</h2>
                    <div className={style.userList}>
                        {allRegisteredUsers.filter(
                            (item) =>
                                item.id !== loggedUser &&
                                normalizeText(item.name.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase()))
                        ).length == 0 && <p>No users found</p>}
                        {allRegisteredUsers
                            .filter(
                                (item) =>
                                    normalizeText(item.name.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase())) &&
                                    item.id !== loggedUser
                            )
                            .map((item, index) => (
                                <div key={item.id} className={style.user_card}>
                                    <div className={style.user_card_image}>
                                        <img
                                            src={`http://localhost:8080${item.profilePicPath}`}
                                            alt="user_profile"
                                        />
                                    </div>
                                    <p className={style.user_card_name}>{item.name}</p>
                                    <div className={style.user_card_info}>
                                        <p>
                                            <span>{item.followers}</span> Followers
                                        </p>
                                        <p>
                                            <span>{item.following}</span> Following
                                        </p>
                                        <p>
                                            <span>{item.posts}</span> Posts
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            followingIds.includes(item.id)
                                                ? style.user_card_button_unfollow
                                                : style.user_card_button
                                        }
                                    >
                                        <button onClick={() => handleFollowUser(item.id)}>
                                            {followingIds.includes(item.id) ? "Unfollow" : "Follow"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
            {searchTerm != "" &&
                searchType == "Event" &&
                searchEventBy == "title" && (
                    <div className={style.data_exib}>
                        <h2>Searching for events: including "{searchTerm}"</h2>
                        <div className={style.userList}>
                            {allRegisteredEvents.filter((item) =>
                                normalizeText(item.title.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase())) && item.active == true
                            ).length == 0 && <p>No events found</p>}
                            {allRegisteredEvents
                                .filter((item) =>
                                    normalizeText(item.title.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase())) && item.active == true
                                )
                                .map((item, index) => (
                                    <div className={style.event_card}>
                                        <div className={style.event_card_image}>
                                            <img
                                                src={`http://localhost:8080${item.imagePath}`}
                                                alt="event_image"
                                            />
                                        </div>
                                        <div className={style.event_card_info}>
                                            <h3 className={style.event_card_title}>{item.title}</h3>
                                            <p>Type: {item.type}</p>
                                            <p className={style.event_card_date}>
                                                <AccessTimeIcon />{" "}
                                                {`${formatNumber(item.date[2])}/${formatNumber(
                                                    item.date[1]
                                                )}/${formatNumber(item.date[0])}, ${formatNumber(
                                                    item.hour[0]
                                                )}:${formatNumber(item.hour[1])}`}
                                            </p>
                                            {item.type == "PRESENTIAL" && (
                                                <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                    <LocationPinIcon /> {item.location}
                                                </p>
                                            )}
                                            {item.type == "ONLINE" && (
                                                <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                    <LinkIcon /> {item.link}
                                                </p>
                                            )}
                                            <p className={style.event_card_organizer_name}>
                                                <PeopleIcon /> {item.organizerName}
                                            </p>
                                        </div>
                                        {userRole !== "ORGANIZER" && (
                                            <div className={style.event_card_button}>
                                                <button
                                                    onClick={
                                                        subscriptionEventIds.includes(item.id)
                                                            ? () => handleCancelSubsModal(item.id)
                                                            : () => handleSubscriptionModal(item.id)
                                                    }
                                                    className={
                                                        subscriptionEventIds.includes(item.id)
                                                            ? style.unsubscribe_button
                                                            : style.subscribe_button
                                                    }
                                                >
                                                    {subscriptionEventIds.includes(item.id)
                                                        ? "Unsubscribe"
                                                        : "Subscribe"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            {searchTerm != "" && searchType == "Event" && searchEventBy == "date" && (
                <div className={style.data_exib}>
                    <h2>Searching for events: including "{searchTerm}"</h2>
                    <div className={style.userList}>
                        {allRegisteredEvents.filter(
                            (item) =>
                                item.organizerId !== loggedUser ||
                                normalizeText(item.title.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase())) && item.active == true
                        ).length == 0 && <p>No events found</p>}
                        {allRegisteredEvents
                            .filter((item) =>
                                `${formatNumber(item.date[2])}/${formatNumber(
                                    item.date[1]
                                )}/${formatNumber(item.date[0])}`.includes(normalizeText(searchTerm)) && item.active == true
                            )
                            .map((item, index) => (
                                <div className={style.event_card}>
                                    <div className={style.event_card_image}>
                                        <img
                                            src={`http://localhost:8080${item.imagePath}`}
                                            alt="event_image"
                                        />
                                    </div>
                                    <div className={style.event_card_info}>
                                        <h3 className={style.event_card_title}>{item.title}</h3>
                                        <p>Type: {item.type}</p>
                                        <p className={style.event_card_date}>
                                            <AccessTimeIcon />{" "}
                                            {`${formatNumber(item.date[2])}/${formatNumber(
                                                item.date[1]
                                            )}/${formatNumber(item.date[0])}, ${formatNumber(
                                                item.hour[0]
                                            )}:${formatNumber(item.hour[1])}`}
                                        </p>
                                        {item.type == "PRESENTIAL" && (
                                            <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                <LocationPinIcon /> {item.location}
                                            </p>
                                        )}
                                        <p className={style.event_card_organizer_name}>
                                            <PeopleIcon /> {item.organizerName}
                                        </p>
                                    </div>
                                    {userRole !== "ORGANIZER" && (
                                        <div className={style.event_card_button}>
                                            <button
                                                onClick={
                                                    subscriptionEventIds.includes(item.id)
                                                        ? () => handleCancelSubsModal(item.id)
                                                        : () => handleSubscriptionModal(item.id)
                                                }
                                                className={
                                                    subscriptionEventIds.includes(item.id)
                                                        ? style.unsubscribe_button
                                                        : style.subscribe_button
                                                }
                                            >
                                                {subscriptionEventIds.includes(item.id)
                                                    ? "Unsubscribe"
                                                    : "Subscribe"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            )}
            {searchTerm != "" &&
                searchType == "Event" &&
                searchEventBy == "location" && (
                    <div className={style.data_exib}>
                        <h2>Searching for events: including "{searchTerm}"</h2>
                        {allRegisteredEvents
                        .filter((item) => item.location)
                        .filter(
                            (item) =>
                                item.organizerId !== loggedUser ||
                                normalizeText(item.location.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase())) && item.active == true
                        ).length == 0 && <p>No events found</p>}
                        <div className={style.userList}>
                            {allRegisteredEvents
                            .filter((item) => item.location)
                                .filter((item) =>
                                    normalizeText(item.location.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase())) && item.active == true
                                )
                                .map((item, index) => (
                                    <div className={style.event_card}>
                                        <div className={style.event_card_image}>
                                            <img
                                                src={`http://localhost:8080${item.imagePath}`}
                                                alt="event_image"
                                            />
                                        </div>
                                        <div className={style.event_card_info}>
                                            <h3 className={style.event_card_title}>{item.title}</h3>
                                            <p>Type: {item.type}</p>
                                            <p className={style.event_card_date}>
                                                <AccessTimeIcon />{" "}
                                                {`${formatNumber(item.date[2])}/${formatNumber(
                                                    item.date[1]
                                                )}/${formatNumber(item.date[0])}, ${formatNumber(
                                                    item.hour[0]
                                                )}:${formatNumber(item.hour[1])}`}
                                            </p>
                                            {item.type == "PRESENTIAL" && (
                                                <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                    <LocationPinIcon /> {item.location}
                                                </p>
                                            )}
                                            {item.type == "ONLINE" && (
                                                <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                    <LinkIcon /> {item.link}
                                                </p>
                                            )}
                                            <p className={style.event_card_organizer_name}>
                                                <PeopleIcon /> {item.organizerName}
                                            </p>
                                        </div>
                                        {userRole != "ORGANIZER" && (
                                            <div className={style.event_card_button}>
                                                <button
                                                    onClick={
                                                        subscriptionEventIds.includes(item.id)
                                                            ? () => handleCancelSubsModal(item.id)
                                                            : () => handleSubscriptionModal(item.id)
                                                    }
                                                    className={
                                                        subscriptionEventIds.includes(item.id)
                                                            ? style.unsubscribe_button
                                                            : style.subscribe_button
                                                    }
                                                >
                                                    {subscriptionEventIds.includes(item.id)
                                                        ? "Unsubscribe"
                                                        : "Subscribe"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            {searchTerm != "" && searchType == "Event" && searchEventBy == "type" && (
                <div className={style.data_exib}>
                    <h2>Searching for events: including "{searchTerm}"</h2>
                    <div className={style.userList}>
                        {allRegisteredEvents.filter(
                            (item) =>
                                item.organizerId !== loggedUser ||
                                item.organizerName
                                    .toLowerCase()
                                    .includes(normalizeText(searchTerm.toLowerCase())) && item.active == true
                        ).length == 0 && <p>No events found</p>}
                        {allRegisteredEvents
                            .filter((item) =>
                                normalizeText(item.type.toLowerCase()).includes(normalizeText(searchTerm.toLowerCase())) && item.active == true
                            )
                            .map((item, index) => (
                                <div className={style.event_card}>
                                    <div className={style.event_card_image}>
                                        <img
                                            src={`http://localhost:8080${item.imagePath}`}
                                            alt="event_image"
                                        />
                                    </div>
                                    <div className={style.event_card_info}>
                                        <h3 className={style.event_card_title}>{item.title}</h3>
                                        <p>Type: {item.type}</p>
                                        <p className={style.event_card_date}>
                                            <AccessTimeIcon />{" "}
                                            {`${formatNumber(item.date[2])}/${formatNumber(
                                                item.date[1]
                                            )}/${formatNumber(item.date[0])}, ${formatNumber(
                                                item.hour[0]
                                            )}:${formatNumber(item.hour[1])}`}
                                        </p>
                                        {item.type == "PRESENTIAL" && (
                                            <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                <LocationPinIcon /> {item.location}
                                            </p>
                                        )}
                                        {item.type == "ONLINE" && (
                                            <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                <LinkIcon /> {item.link}
                                            </p>
                                        )}
                                        <p className={style.event_card_organizer_name}>
                                            <PeopleIcon /> {item.organizerName}
                                        </p>
                                    </div>
                                    {userRole !== "ORGANIZER" && (
                                        <div className={style.event_card_button}>
                                            <button
                                                onClick={
                                                    subscriptionEventIds.includes(item.id)
                                                        ? () => handleCancelSubsModal(item.id)
                                                        : () => handleSubscriptionModal(item.id)
                                                }
                                                className={
                                                    subscriptionEventIds.includes(item.id)
                                                        ? style.unsubscribe_button
                                                        : style.subscribe_button
                                                }
                                            >
                                                {subscriptionEventIds.includes(item.id)
                                                    ? "Unsubscribe"
                                                    : "Subscribe"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            )}
            {searchTerm != "" &&
                searchType == "Event" &&
                searchEventBy == "organizer" && (
                    <div className={style.data_exib}>
                        <h2>Searching for events: including "{searchTerm}"</h2>
                        {allRegisteredEvents.filter(
                            (item) =>
                                item.organizerId !== loggedUser &&
                                item.organizerName
                                    .toLowerCase()
                                    .includes(normalizeText(searchTerm.toLowerCase())) && item.active == true
                        ).length == 0 && <p>No events found</p>}
                        <div className={style.userList}>
                            {allRegisteredEvents
                                .filter((item) =>
                                    item.organizerName
                                        .toLowerCase()
                                        .includes(normalizeText(searchTerm.toLowerCase())) && item.active == true  
                                )
                                .map((item, index) => (
                                    <div className={style.event_card}>
                                        <div className={style.event_card_image}>
                                            <img
                                                src={`http://localhost:8080${item.imagePath}`}
                                                alt="event_image"
                                            />
                                        </div>
                                        <div className={style.event_card_info}>
                                            <h3 className={style.event_card_title}>{item.title}</h3>
                                            <p>Type: {item.type}</p>
                                            <p className={style.event_card_date}>
                                                <AccessTimeIcon />{" "}
                                                {`${formatNumber(item.date[2])}/${formatNumber(
                                                    item.date[1]
                                                )}/${formatNumber(item.date[0])}, ${formatNumber(
                                                    item.hour[0]
                                                )}:${formatNumber(item.hour[1])}`}
                                            </p>
                                            {item.type == "PRESENTIAL" && (
                                                <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                    <LocationPinIcon /> {item.location}
                                                </p>
                                            )}
                                            {item.type == "ONLINE" && (
                                                <p className={style.event_card_location} style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                                    <LinkIcon /> {item.link}
                                                </p>
                                            )}
                                            <p className={style.event_card_organizer_name}>
                                                <PeopleIcon /> {item.organizerName}
                                            </p>
                                        </div>
                                        {userRole !== "ORGANIZER" && (
                                            <div className={style.event_card_button}>
                                                <button
                                                    onClick={
                                                        subscriptionEventIds.includes(item.id)
                                                            ? () => handleCancelSubsModal(item.id)
                                                            : () => handleSubscriptionModal(item.id)
                                                    }
                                                    className={
                                                        subscriptionEventIds.includes(item.id)
                                                            ? style.unsubscribe_button
                                                            : style.subscribe_button
                                                    }
                                                >
                                                    {subscriptionEventIds.includes(item.id)
                                                        ? "Unsubscribe"
                                                        : "Subscribe"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            {searchTerm != "" &&
                searchType == "Post" &&
                searchPostBy == "content" && (
                    <div className={style.data_exib}>
                        <h2>Searching for posts: including "{searchTerm}"</h2>
                        <div className={style.post_list}>
                            {allRegisteredPosts.filter(
                                (item) =>
                                    item.content
                                        .toLowerCase()
                                        .includes(normalizeText(searchTerm.toLowerCase())) &&
                                    item.userId !== loggedUser &&
                                    !item.hasOwnProperty("eventId")
                            ).length == 0 && <p>No posts found</p>}
                            {allRegisteredPosts
                                .filter(
                                    (item) =>
                                        item.content
                                            .toLowerCase()
                                            .includes(normalizeText(searchTerm.toLowerCase())) &&
                                        item.userId !== loggedUser &&
                                        !item.hasOwnProperty("eventId")
                                )
                                .map((item, index) => (
                                    <PostItem
                                        key={item.id}
                                        postId={item.id}
                                        userId={item.userId}
                                        userProfilePic={item.userProfilePic}
                                        userName={item.userName}
                                        content={item.content}
                                        imagesPath={item.imagesPath}
                                        likeList={item.likeList}
                                        commentList={item.commentList}
                                        date={item.date}
                                    />
                                ))}
                        </div>
                    </div>
                )}
            {searchTerm != "" && searchType == "Post" && searchPostBy == "user" && (
                <div className={style.data_exib}>
                    <h2>Searching for posts: including "{searchTerm}"</h2>
                    <div className={style.post_list}>
                        {allRegisteredPosts.filter(
                            (item) =>
                                item.userName
                                    .toLowerCase()
                                    .includes(normalizeText(searchTerm.toLowerCase())) &&
                                item.userId !== loggedUser &&
                                !item.hasOwnProperty("eventId")
                        ).length == 0 && <p>No posts found</p>}
                        {allRegisteredPosts
                            .filter(
                                (item) =>
                                    item.userName
                                        .toLowerCase()
                                        .includes(normalizeText(searchTerm.toLowerCase())) &&
                                    item.userId !== loggedUser &&
                                    !item.hasOwnProperty("eventId")
                            )
                            .map((item, index) => (
                                <PostItem
                                    key={item.id}
                                    postId={item.id}
                                    userId={item.userId}
                                    userProfilePic={item.userProfilePic}
                                    userName={item.userName}
                                    content={item.content}
                                    imagesPath={item.imagesPath}
                                    likeList={item.likeList}
                                    commentList={item.commentList}
                                    date={item.date}
                                />
                            ))}
                    </div>
                </div>
            )}
            {subscriptionModalIsOpen && (
                <SubscribeModal
                    id={chooseEventId}
                    closeModal={handleCloseSubscriptionModal}
                    fetchEvents={fetchAllEvents}
                    fetchSubscriptions={fetchLoggedUserSubscriptions}
                />
            )}

            {cancelSubsModalIsOpen && (
                <CancelSubsModal
                    id={chooseEventId}
                    closeModal={handleCloseCancelSubsModal}
                    fetchEvents={fetchAllEvents}
                    fetchSubscriptions={fetchLoggedUserSubscriptions}
                />
            )}
        </div>
    );
};
