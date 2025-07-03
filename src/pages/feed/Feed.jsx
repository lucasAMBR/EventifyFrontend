import style from "./Feed.module.css";
import api from "../../services/Api";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import { PostItem } from "./components/PostItem";
import { ImageSelector } from "./components/ImageSelector";
import { UserCard } from "./components/UserCard";
import { EventCard } from "./components/EventCard";
import { SubscribeModal } from "./components/SubscribeModal";

export const Feed = () => {
    const navigate = useNavigate();

    const { loggedUser, userRole } = useUserContext();

    const [selectedFeed, setSelectedFeed] = useState("popular");

    const [userPopularFeed, setUserPopularFeed] = useState([]);
    const [userFollowingFeed, setUserFollowingFeed] = useState([]);
    const [popularUsers, setPopularUsers] = useState([]);
    const [popularEvents, setPopularEvents] = useState([]);

    const [newPostContent, setNewPostContent] = useState("");
    const [images, setImages] = useState([]);

    const handleNewContentChange = (event) => {
        setNewPostContent(event.target.value);
    };

    const [subscriptionModalIsOpen, setSubscriptionModalIsOpen] = useState(false);
    const [choosedEvent, setChoosedEvent] = useState(null);

    const openSubscribeModal = (id) => {
        console.log("executando");
        setChoosedEvent(id);
        setSubscriptionModalIsOpen(true);
    };

    const closeSubscriptionModal = () => {
        setChoosedEvent(null);
        setSubscriptionModalIsOpen(false);
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loggedUser) {
            document.title = "Eventfy - Home";
            fetchAllFeeds();
        }
    }, [loggedUser]);

    const fetchPopularUsers = async () => {
        try {
            const populars = await api.get(`feed/popular-users/${loggedUser}`);
            setPopularUsers(populars.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPopulaEvents = async () => {
        try {
            const pop_events = await api.get(`feed/popular/events/${loggedUser}`);

            console.log(pop_events.data);
            setPopularEvents(pop_events.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPopularFeed = async () => {
        try {
            const response = await api.get(`feed/popular/${loggedUser}`);

            setUserPopularFeed(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchFollowingFeed = async () => {
        try {
            const response = await api.get(`feed/following/${loggedUser}`);
            setUserFollowingFeed(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFeedSwitch = (feed) => {
        setSelectedFeed(feed);
        fetchAllFeeds();
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log(loggedUser);
        console.log(images);

        const formData = new FormData();
        formData.append("userId", loggedUser);
        formData.append("content", newPostContent);

        images.forEach((image, index) => {
            formData.append("postImages", image);
        });

        try {
            const response = await api.post("post/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            fetchAllFeeds();
            setNewPostContent("");
            setImages([]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllFeeds = () => {
        setLoading(true);
        fetchPopularFeed();
        fetchFollowingFeed();
        fetchPopularUsers();
        fetchPopulaEvents();
        setLoading(false);
    };

    return (
        <div className={style.feed_area}>
            <div className={style.post_list}>
                <div className={style.add_post_form}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={style.form_header}>
                            <h2 onClick={() => console.log(userPopularFeed)}>Make a post</h2>
                            <ImageSelector onfilesSelected={setImages} />
                        </div>

                        <textarea
                            placeholder="Insert the post content here"
                            value={newPostContent}
                            onChange={handleNewContentChange}
                        ></textarea>
                        <div className={style.post_buttons_area}>
                            <button type="submit" className={style.publish_button} disabled={newPostContent.length == ""}>
                                Publish
                            </button>
                        </div>
                    </form>
                </div>
                <div className={style.feed_selector}>
                    <div>
                        <span
                            className={selectedFeed == "popular" ? style.selected : ""}
                            onClick={() => handleFeedSwitch("popular")}
                        >
                            Popular
                        </span>{" "}
                        |{" "}
                        <span
                            className={selectedFeed == "following" ? style.selected : ""}
                            onClick={() => handleFeedSwitch("following")}
                        >
                            Following
                        </span>
                    </div>
                    <div className={style.feed_post_list}></div>
                    {!loading &&
                        userPopularFeed.filter((post) => !post.hasOwnProperty("eventId"))
                            .length == 0 &&
                        selectedFeed == "popular" && (
                            <>
                                <p>It seems that we still don't have any posts...</p>
                            </>
                        )}
                    {!loading &&
                        userPopularFeed.filter((post) => !post.hasOwnProperty("eventId"))
                            .length > 0 &&
                        selectedFeed == "popular" && (
                            <>
                                {userPopularFeed
                                    .filter((post) => !post.hasOwnProperty("eventId"))
                                    .map((post, index) => (
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
                    {!loading &&
                        userFollowingFeed.filter((post) => !post.hasOwnProperty("eventId"))
                            .length > 0 &&
                        selectedFeed == "following" && (
                            <>
                                {userFollowingFeed
                                    .filter((post) => !post.hasOwnProperty("eventId"))
                                    .map((post, index) => (
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
                    {!loading &&
                        userFollowingFeed.filter((post) => !post.hasOwnProperty("eventId"))
                            .length == 0 &&
                        selectedFeed == "following" && (
                            <>
                                <p>It seems that you are still not following anyone...</p>
                            </>
                        )}
                </div>
            </div>
            <div className={style.recomendations}>
                <div className={style.popular_users}>
                    <h2 onClick={() => console.log(userRole)}>Popular Users</h2>
                    {popularUsers.length == 0 && (
                        <p>It seems that we still don't have any registered users...</p>
                    )}
                    {popularUsers.map((item) => (
                        <UserCard
                            key={item.id}
                            fetchPopulars={fetchPopularUsers}
                            userId={item.id}
                            userName={item.name}
                            profilePic={item.profilePicPath}
                            usertype={item.type}
                            followers={item.followers}
                            following={item.following}
                            posts={item.posts}
                        />
                    ))}
                </div>
                {userRole != "ORGANIZER" && (
                    <div className={style.popular_events}>
                        <h2>Popular events</h2>
                        {popularEvents.filter((event) => event.active == true).length ==
                            0 && (
                                <p>It seems that we still don't have any registered users...</p>
                            )}
                        {popularEvents
                            .filter((event) => event.active == true)
                            .map((item, index) => (
                                <EventCard
                                    id={item.id}
                                    type={item.type}
                                    organizerId={item.organizerId}
                                    banner={`http://localhost:8080${item.imagePath}`}
                                    title={item.title}
                                    organizer={item.organizerName}
                                    date={item.date}
                                    hour={item.hour}
                                    setModal={openSubscribeModal}
                                />
                            ))}
                    </div>
                )}
            </div>
            {subscriptionModalIsOpen && choosedEvent != null && (
                <SubscribeModal
                    id={choosedEvent}
                    closeModal={closeSubscriptionModal}
                    fetchEvents={fetchPopulaEvents}
                />
            )}
        </div>
    );
};
