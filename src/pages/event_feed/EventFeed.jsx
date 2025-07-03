import style from "./Feed.module.css";
import api from "../../services/Api";
import { useEffect, useMemo, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";

import { PostItem } from "./components/PostItem";
import { ImageSelector } from "./components/ImageSelector";
import { UserCard } from "./components/UserCard";
import { EventCard } from "./components/EventCard";
import { SubscribeModal } from "./components/SubscribeModal";
import { RemoveMemberModal } from "./components/RemoveMemberModal";
import SearchIcon from '@mui/icons-material/Search';

export const EventFeed = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loggedUser, userRole } = useUserContext();

    const [event, setEvent] = useState({});
    const [eventMembers, setEventMembers] = useState([]);
    const [eventFeed, setEventFeed] = useState([]);
    const [somethingChanged, setSomethingChanged] = useState(false);
    const [memberSearchTerm, setMemberSearchTerm] = useState("");
    const [organizerOptions, setOrganizerOptions] = useState("search");
    const [newPostContent, setNewPostContent] = useState("");
    const [images, setImages] = useState([]);
    const [loggedUserFollowing, setLoggedUserFollowing] = useState([]);
    const [removeMemberModalIsOpen, setRemoveMemberModalIsOpen] = useState(false);
    const [choosedMember, setChoosedMember] = useState(null);
    const [subscriptionModalIsOpen, setSubscriptionModalIsOpen] = useState(false);
    const [choosedEvent, setChoosedEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const followingIds = useMemo(
        () => loggedUserFollowing.map((item) => item.id),
        [loggedUserFollowing]
    );

    const handleMemberSearchTerm = (event) => {
        setMemberSearchTerm(event.target.value);
    };

    const openRemoveMemberModal = (userId) => {
        setChoosedMember(userId);
        setRemoveMemberModalIsOpen(true);
    };

    const openSubscribeModal = (id) => {
        setChoosedEvent(id);
        setSubscriptionModalIsOpen(true);
    };

    const closeSubscriptionModal = () => {
        setChoosedEvent(null);
        setSubscriptionModalIsOpen(false);
    };

    const handleNewContentChange = (event) => {
        setNewPostContent(event.target.value);
    };

    const formatDateToISO = (dateStr) => {
        const [datePart, timePart] = dateStr.split(", ");
        const [day, month, year] = datePart.split("/");
        return `${year}-${month}-${day}T${timePart}`;
    };

    const fetchLoggedUserFollowing = async () => {
        const response = await api.get(`/user/profile/${loggedUser}`);
        setLoggedUserFollowing(response.data.following);
    };

    const fetchEventFeed = async () => {
        try {
            const response = await api.get(`post/event/${id}`);
            setEventFeed(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchEventMembers = async () => {
        try {
            const response = await api.get(`feed/members/${id}`);
            setEventMembers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchEvent = async () => {
        try {
            const response = await api.get(`event/find/${id}`);
            setEvent(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllData = async () => {
        fetchEventFeed();
        fetchEventMembers();
        fetchEvent();
        fetchLoggedUserFollowing();
        setSomethingChanged(false);
        setLoading(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("userId", loggedUser);
        formData.append("eventId", id);
        formData.append("content", newPostContent);
        images.forEach((image) => formData.append("postImages", image));

        try {
            await api.post("post/create/event", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setNewPostContent("");
            setImages([]);
            setSomethingChanged(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (loggedUser) {
            document.title = "Eventfy - Home";
            fetchAllData();
        }
    }, [loggedUser, somethingChanged]);

    return (
        <div className={style.feed_area}>
            <div className={style.post_list}>
                <h2 className={style.event_feed_title} onClick={() => console.log(eventFeed)}>
                    Event feed: {event.title}
                </h2>
                <div className={style.add_post_form}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={style.form_header}>
                            <h2>Make a post</h2>
                            <ImageSelector onfilesSelected={setImages} />
                        </div>
                        <textarea
                            placeholder="Insert the post content here"
                            value={newPostContent}
                            onChange={handleNewContentChange}
                        ></textarea>
                        <div className={style.post_buttons_area}>
                            <button type="submit" className={style.publish_button} disabled={newPostContent.length == ""}>Publish</button>
                        </div>
                    </form>
                </div>
                <div className={style.feed_selector}>
                    <h2 className={style.event_feed_title}>Members Posts</h2>
                    {!loading && eventFeed.length == 0 && (
                        <p>It seems that we still don't have any posts...</p>
                    )}
                    {!loading && eventFeed.length > 0 && (
                        <>
                            {eventFeed.map((post) => (
                                <PostItem
                                    key={post.id}
                                    postId={post.id}
                                    userId={post.userId}
                                    userType={post.userType}    
                                    userProfilePic={post.userProfilePic}
                                    userName={post.userName}
                                    content={post.content}
                                    imagesPath={post.imagesPath}
                                    likeList={post.likeList}
                                    commentList={post.commentList}
                                    date={post.date}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>

            <div className={style.recomendations}>
                <h2 className={style.event_feed_title} style={{ opacity: 0 }}>Members</h2>
                <div className={style.popular_users}>
                    <h2 className={style.recomendations_title}>Members</h2>
                    {eventMembers.filter(member => member.id != loggedUser).length > 0 && (
                        <div className={style.popular_users_search}>
                            <div className={style.popular_users_search_icon}>
                                <SearchIcon sx={{ fill: "#004643" }} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for a member"
                                value={memberSearchTerm}
                                onChange={handleMemberSearchTerm}
                            />
                        </div>
                    )}
                    {event.organizerId == loggedUser && eventMembers.filter(member => member.id != loggedUser).length > 0 && (
                        <div className={style.organizer_options}>
                            <button
                                onClick={() => setOrganizerOptions("search")}
                                className={organizerOptions == "search" ? style.organizer_option_active : style.organizer_option_inactive}
                            >
                                Search member
                            </button>
                            <button
                                onClick={() => setOrganizerOptions("remove")}
                                className={organizerOptions == "remove" ? style.organizer_option_active : style.organizer_option_inactive}
                            >
                                Remove member
                            </button>
                        </div>
                    )}
                    {eventMembers.filter(member => member.id != loggedUser).length == 0 && (
                        <p>It seems that we still don't have any other members...</p>
                    )}
                    {memberSearchTerm == "" && (
                        <>
                            {eventMembers
                                .filter(member => member.id != loggedUser)
                                .map((member) => (
                                    <UserCard
                                        key={member.id}
                                        openRemoveMemberModal={openRemoveMemberModal}
                                        activeTab={organizerOptions}
                                        userId={member.id}
                                        userName={member.name}
                                        userType={member.type}
                                        profilePic={member.profilePicPath}
                                        usertype={member.type}
                                        followers={member.followers}
                                        following={member.following}
                                        posts={member.posts}
                                        fetchPopulars={fetchAllData}
                                        followingIds={followingIds}
                                    />
                                ))}
                        </>
                    )}
                    {memberSearchTerm != "" && (
                        <>
                            {eventMembers
                                .filter(
                                    member =>
                                        member.id != loggedUser &&
                                        member.name.toLowerCase().includes(memberSearchTerm.toLowerCase())
                                )
                                .map((member) => (
                                    <UserCard
                                        key={member.id}
                                        openRemoveMemberModal={openRemoveMemberModal}
                                        activeTab={organizerOptions}
                                        userId={member.id}
                                        userName={member.name}
                                        userType={member.type}
                                        profilePic={member.profilePicPath}
                                        usertype={member.type}
                                        followers={member.followers}
                                        following={member.following}
                                        posts={member.posts}
                                        fetchPopulars={fetchAllData}
                                        followingIds={followingIds}
                                    />
                                ))}
                            {eventMembers.filter(
                                member =>
                                    member.id != loggedUser &&
                                    member.name.toLowerCase().includes(memberSearchTerm.toLowerCase())
                            ).length == 0 && (
                                <p>No members found with the name "{memberSearchTerm}"</p>
                            )}
                        </>
                    )}
                </div>
            </div>

            {removeMemberModalIsOpen && (
                <RemoveMemberModal
                    setRemoveMemberModalIsOpen={setRemoveMemberModalIsOpen}
                    userId={choosedMember}
                    eventId={id}
                    fetchAllData={fetchAllData}
                />
            )}
        </div>
    );
};
