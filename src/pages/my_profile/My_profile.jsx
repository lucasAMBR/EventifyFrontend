import style from "./Profile.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/Api";
import { useUserContext } from "../../contexts/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import { PostItem } from "./components/PostItem";
import { EventCard } from "../feed/components/EventCard";
import { SubscriptionItem } from "./components/SubscriptionItem";
import { ChangePasswordModal } from "./components/ChangePasswordModal";
import { UpdateProfileModal } from "./components/UpdateProfileModal";

export const MyProfile = () => {
    const { loggedUser } = useUserContext();

    const [userData, setUserData] = useState(null);

    const [activeTab, setActiveTab] = useState("posts");

    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const [updateProfileModal, setUpdateProfileModal] = useState(false);

    const [userPosts, setUserPosts] = useState([]);
    const [userLikedPosts, setUserLikedPosts] = useState([]);

    const [userEvents, setUserEvents] = useState([]);

    const fetchUserPosts = async () => {
        const response = await api.get(`/post/user/${loggedUser}`);
        setUserPosts(response.data);
    };

    const fetchUserLikedPosts = async () => {
        const response = await api.get(`/post/liked/user/${loggedUser}`);
        setUserLikedPosts(response.data);
    };

    const fetchUserEvents = async () => {
        const response = await api.get(`/subscription/list/user/${loggedUser}`);
        setUserEvents(response.data);
    };

    const fetchAllData = async () => {
        await fetchUserData();
        await fetchUserPosts();
        await fetchUserLikedPosts();
        await fetchUserEvents();
    };

    useEffect(() => {
        document.title = "Eventfy - My Profile";
        fetchAllData();
    }, []);

    const fetchUserData = async () => {
        const response = await api.get(`/user/profile/${loggedUser}`);

        setUserData(response.data);
    };

    return (
        <div className={style.profile_content}>
            {userData != null && (
                <div className={style.profile_header}>
                    <div className={style.profile_header_pic}>
                        <img
                            src={`http://localhost:8080${userData.profilePicPath}`}
                            alt="Profile"
                        />
                    </div>
                    <div className={style.profile_header_info}>
                        <div className={style.profile_header_info_left}>
                            <h2>
                                {userData.name}{" "}
                                {userData.id == loggedUser && (
                                    <div
                                        className={style.profile_header_edit_username}
                                        onClick={() => setUpdateProfileModal(true)}
                                    >
                                        <EditIcon />
                                    </div>
                                )}
                            </h2>
                            <p>{userData.postList.length} posts</p>
                            <p>{userData.followers.length} followers</p>
                            <p>{userData.following.length} following</p>
                            {userData.id == loggedUser && (
                                <div className={style.profile_header_edit_profile}>
                                    <button onClick={() => setChangePasswordModal(true)}>
                                        Change Password
                                    </button>
                                </div>
                            )}
                            {userData.id != loggedUser && (
                                <div className={style.profile_header_edit_profile}>
                                    <button>Follow</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {userData != null && (
                <div className={style.profile_posts_container}>
                    <div className={style.profile_posts}>
                        <h2>
                            <span
                                onClick={() => setActiveTab("posts")}
                                className={
                                    activeTab == "posts" ? style.active_tab : style.inactive_tab
                                }
                            >
                                Posts
                            </span>{" "}
                            |{" "}
                            <span
                                onClick={() => setActiveTab("liked_posts")}
                                className={
                                    activeTab == "liked_posts"
                                        ? style.active_tab
                                        : style.inactive_tab
                                }
                            >
                                Liked Posts
                            </span>
                        </h2>
                        <div
                            className={style.profile_posts_list}
                            style={
                                activeTab == "posts"
                                    ? { flexDirection: "column" }
                                    : { flexDirection: "column-reverse" }
                            }
                        >
                            {activeTab == "posts" &&
                                userPosts
                                    .filter((post) => !post.hasOwnProperty("eventId"))
                                    .map((post, index) => (
                                        <PostItem
                                            postId={post.id}
                                            userId={post.userId}
                                            userProfilePic={post.userProfilePic}
                                            userName={post.userName}
                                            content={post.content}
                                            imagesPath={post.imagesPath}
                                            likeList={post.likeList}
                                            commentList={post.commentList}
                                            date={post.date}
                                        />
                                    ))}
                            {activeTab == "posts" &&
                                userPosts.filter((post) => !post.hasOwnProperty("eventId"))
                                    .length == 0 && <p>No posts found</p>}
                            {activeTab == "liked_posts" &&
                                userLikedPosts
                                    .filter((post) => !post.hasOwnProperty("eventId"))
                                    .map((post, index) => (
                                        <PostItem
                                            postId={post.id}
                                            userId={post.userId}
                                            userProfilePic={post.userProfilePic}
                                            userName={post.userName}
                                            content={post.content}
                                            imagesPath={post.imagesPath}
                                            likeList={post.likeList}
                                            commentList={post.commentList}
                                            date={post.date}
                                        />
                                    ))}
                            {activeTab == "liked_posts" &&
                                userLikedPosts.filter((post) => !post.hasOwnProperty("eventId"))
                                    .length == 0 && <p>No liked posts found</p>}
                        </div>
                    </div>
                    <div className={style.profile_event_container}>
                        {"eventList" in userData ? (
                            <>
                                <h2>Active Events: </h2>
                                <div className={style.profile_event_list}>
                                    {userData.eventList.filter((event) => event.active == true)
                                        .length == 0 && <p>No active events found</p>}
                                    {userData.eventList
                                        .filter((event) => event.active == true)
                                        .map((event, index) => (
                                            <SubscriptionItem
                                                eventId={event.id}
                                                eventTitle={event.title}
                                                eventDate={event.date}
                                                eventHour={event.hour}
                                                eventBanner={`http://localhost:8080${event.imagePath}`}
                                                eventLocation={event.location}
                                            />
                                        ))}
                                </div>
                                <h2>Concluded Events</h2>
                                <div className={style.profile_event_list}>
                                    {userData.eventList.filter(
                                        (event) =>
                                            event.active == false && event.subscriptionList.length > 0
                                    ).length == 0 && <p>No concluded events found</p>}
                                    {userData.eventList
                                        .filter(
                                            (event) =>
                                                event.active == false &&
                                                event.subscriptionList.length > 0
                                        )
                                        .map((event, index) => (
                                            <SubscriptionItem
                                                eventId={event.id}
                                                eventTitle={event.title}
                                                eventDate={event.date}
                                                eventHour={event.hour}
                                                eventBanner={`http://localhost:8080${event.imagePath}`}
                                                eventLocation={event.location}
                                            />
                                        ))}
                                </div>
                                <h2>Canceled Events</h2>
                                <div className={style.profile_event_list}>
                                    {userData.eventList.filter(
                                        (event) =>
                                            event.active == false &&
                                            event.subscriptionList.length == 0
                                    ).length == 0 && <p>No canceled events found</p>}
                                    {userData.eventList
                                        .filter(
                                            (event) =>
                                                event.active == false &&
                                                event.subscriptionList.length == 0
                                        )
                                        .map((event, index) => (
                                            <SubscriptionItem
                                                eventId={event.id}
                                                eventTitle={event.title}
                                                eventDate={event.date}
                                                eventHour={event.hour}
                                                eventBanner={`http://localhost:8080${event.imagePath}`}
                                                eventLocation={event.location}
                                            />
                                        ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <h2>Subscribed in: </h2>
                                <div className={style.profile_event_list}>
                                    {userEvents.filter((event) => event.status == "ABSENT")
                                        .length == 0 && <p>No subscribed events found</p>}
                                    {userEvents
                                        .filter((event) => event.status == "ABSENT")
                                        .map((event, index) => (
                                            <SubscriptionItem
                                                eventId={event.id}
                                                eventTitle={event.eventTitle}
                                                eventDate={event.date}
                                                eventHour={event.hour}
                                                eventBanner={`http://localhost:8080${event.eventBannerPath}`}
                                                eventLocation={event.eventLocation}
                                            />
                                        ))}
                                </div>
                                <h2>Attended Events</h2>
                                <div className={style.profile_event_list}>
                                    {userEvents.filter((event) => event.status == "PRESENT")
                                        .length == 0 && <p>No attended events found</p>}
                                    {userEvents
                                        .filter((event) => event.status == "PRESENT")
                                        .map((event, index) => (
                                            <SubscriptionItem
                                                eventId={event.id}
                                                eventTitle={event.eventTitle}
                                                eventDate={event.date}
                                                eventHour={event.hour}
                                                eventBanner={`http://localhost:8080${event.eventBannerPath}`}
                                                eventLocation={event.eventLocation}
                                            />
                                        ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            {changePasswordModal && (
                <ChangePasswordModal setChangePasswordModal={setChangePasswordModal} />
            )}
            {updateProfileModal && (
                <UpdateProfileModal
                    setUpdateProfileModal={setUpdateProfileModal}
                    userActualName={userData.name}
                    fetchAllData={fetchAllData}
                />
            )}
        </div>
    );
};
