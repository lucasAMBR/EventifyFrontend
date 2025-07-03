import { useUserContext } from "../../../contexts/UserContext"
import api from "../../../services/Api"
import style from "../Feed.module.css"

export const UserCard = ({userId, profilePic, userName, usertype, followers, following, posts, fetchPopulars, followingIds, activeTab, openRemoveMemberModal}) => {

    const { loggedUser, userRole } = useUserContext();

    const handleFollow = async() => {
        try{
            const response = await api.post(`user/follow/${loggedUser}/${userId}`);

            fetchPopulars();
        }catch(error){
            console.log(error);
        }
    }
    
    return(
        <div className={style.user_card}>
            <div className={style.card_infos}>
                <div className={style.card_pic}>
                    <img src={`http://localhost:8080${profilePic}`} />
                </div>
                <div className={style.user_details}>
                    <h3 onClick={() => console.log(followingIds.includes(userId))}>{userName} {usertype == "ORGANIZER" && <span>Organizer</span>}</h3>
                    <p>Followers: {followers} | Following: {following} | Posts: {posts}</p>
                </div>
            </div>
            {userRole == "ORGANIZER" && activeTab == "search" &&
                <button onClick={handleFollow} className={followingIds.includes(userId) ? style.user_card_unfollow_button : style.user_card_follow_button}>{followingIds.includes(userId) ? "Unfollow" : "Follow"}</button>
            }
            {userRole == "ORGANIZER" && activeTab == "remove" &&
                <button className={style.user_card_unfollow_button} onClick={() => openRemoveMemberModal(userId)}>Remove</button>
            }
            {userRole == "DEFAULT" &&
                <button onClick={handleFollow} className={followingIds.includes(userId) ? style.user_card_unfollow_button : style.user_card_follow_button}>{followingIds.includes(userId) ? "Unfollow" : "Follow"}</button>
            }
        </div>
    )
}